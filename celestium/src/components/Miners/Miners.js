import React, {useEffect, useState} from "react";
import MinerItem from "./MinerItem";
import PurchaseModal from "./Purchase";
import ClaimRewardModal from "./ClaimRewardModal";

export default ({ setCurrentPage, sendNotification, userReferralCount, userInit , stars, sendReq, setUpdateMe, updateMe}) => {
    const [activeTab, setActiveTab] = useState("normal");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const [minersData, setMinersData] = useState([]);
    const [minerUpdate, setMinerUpdate] = useState(0);
    setCurrentPage("miners");

    const handleBuy = (id, price) => {
        return async () => {
            if(price > stars){
                sendNotification("Insufficient Balance");
            }
            else{
               try{
                   const a = await sendReq("buy", {id: +id});
                   if(a.data.ok !== false) {
                       sendNotification(`Success`);
                       setTimeout(() => {
                           setUpdateMe(updateMe+1);
                           setMinerUpdate(minerUpdate + 1);
                       }, 2000)
                   } else{
                       sendNotification("Failed")
                   }
               }
               catch(err){

               }

            }
            // console.log(price)
            // Insufficient Balance
            // console.log(`Покупка подтверждена NO-${id}!`);

            setModalOpen(false);
        };
    };

    const handleClaim = (id) => {
        return () => {
            console.log(id)
            handleBuy(id, -1)();
            setModalOpen(false);
        };
    };


    useEffect(() => {
        async function f(){
            if(!userInit){
                return;
            }
            try {
                const data = await sendReq("miners");
                // console.log(data)
                if(data.ok) {
                    setMinersData(data.data)
                }

                // console.log(data)
            } catch (error) {
                console.error(error.message);
            }
        }
        f();
    }, [userInit, minerUpdate, updateMe]);

    const normalMiners = minersData.filter((m) => m.type === "normal");
    const referralMiners = minersData.filter((m) => m.type === "referral");

    return (
        <div>
            <h1 className="text-center mt-5">⛏️ Miner</h1>

            {/* Красивая панель вкладок */}
            <div className="d-flex justify-content-center mt-4 mb-4">
                {["normal", "referral"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`tab-btn mx-2 ${activeTab === tab ? "active" : ""}`}
                    >
                        {tab === "normal" ? "Miner" : "🤝 Referral Miner"}
                    </button>
                ))}
            </div>

            {/* Модальные окна */}
            {modalData.type === "normal" ? (
                <PurchaseModal
                    show={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={handleBuy(modalData.id || 0, modalData.price)}
                    itemName={modalData.name}
                    price={modalData.price}
                />
            ) : (
                <ClaimRewardModal
                    show={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={handleClaim(modalData.id || 0)}
                    itemName={modalData.name}
                />
            )}

            {/* Контент вкладки */}
            <div
                className="text-center fade"
                id="miners"
                style={{
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                    opacity: 1,
                    transform: "translateY(0px)",
                }}
            >
                {(activeTab === "normal" ? normalMiners : referralMiners).map((el, i) => (
                    <MinerItem
                        data={el}
                        setModalOpen={setModalOpen}
                        setModalData={setModalData}
                        userReferralCount={userReferralCount}
                        key={i}
                    />
                ))}
            </div>

            {/* 🔥 Inline стили для кнопок */}
            <style jsx>{`
        .tab-btn {
          border: none;
          outline: none;
          padding: 10px 28px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          color: #fff;
          background: linear-gradient(135deg, #1e1e2f, #2d2d44);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .tab-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #ffd54f, #ffca28);
          color: #222;
          box-shadow: 0 5px 20px rgba(255, 230, 90, 0.6);
          transform: scale(1.05);
        }
      `}</style>
        </div>
    );
};
