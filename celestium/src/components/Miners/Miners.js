// import React, {useState} from "react";
//
// import { FaCoins, FaStore, FaUser } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import MinerItem from "./MinerItem";
// import Purchase from "./Purchase";
//
// export default ({ setCurrentPage }) => {
//     const [modalOpen, setModalOpen] = useState(false);
//     const [modalData, setModalData] = useState({});
//     setCurrentPage("miners");
//     const handleBuy = (id) => {
//         return () => {
//             console.log(`Покупка подтверждена NO-${id}!`);
//             setModalOpen(false);
//         }
//     };
//     const minersData = [{
//         id: 1,
//         price: 50,
//         name: "Star Miner",
//         time: "10 star/hour",
//         img: "https://i.ibb.co/8LMyLZKy/image.png"
//     }, {
//         id: 2,
//         price: 100,
//         name: "Star Miner",
//         time: "100 star/hour",
//         img: "https://i.ibb.co/8LMyLZKy/image.png"
//     },  {
//         id: 2,
//         price: 100,
//         name: "Star Miner",
//         time: "100 star/hour",
//         img: "https://i.ibb.co/8LMyLZKy/image.png"
//     }, {
//         id: 2,
//         price: 100,
//         name: "Star Miner",
//         time: "100 star/hour",
//         img: "https://i.ibb.co/8LMyLZKy/image.png"
//     }]
//     return (
//         <div>
//             <h1 className="text-center" style={{marginTop: "50px"}}>⛏️ Miner</h1>
//             <Purchase
//                 show={modalOpen}
//                 onClose={() => setModalOpen(false)}
//                 onConfirm={handleBuy(modalData.id || 0)}
//                 itemName={modalData.name}
//                 price={modalData.price}
//             />
//             <div className="text-center" id="miners">
//                 {minersData.map((el, i) => {
//                     return <MinerItem data={el} setModalOpen={setModalOpen} setModalData={setModalData} key={i}/>
//                 })}
//             </div>
//         </div>
//     );
// };
import React, { useState } from "react";
import MinerItem from "./MinerItem";
import PurchaseModal from "./Purchase";
import ClaimRewardModal from "./ClaimRewardModal";

export default ({ setCurrentPage }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    setCurrentPage("miners");

    const handleBuy = (id) => {
        return () => {
            console.log(`Покупка подтверждена NO-${id}!`);
            setModalOpen(false);
        };
    };

    const handleClaim = (id) => {
        return () => {
            console.log(`Reward claimed for miner ID-${id}!`);
            setModalOpen(false);
        };
    };

    const userReferralCount = 3;

    const minersData = [
        {
            id: 1,
            price: 50,
            name: "Star Miner",
            time: "10 star/hour",
            img: "https://i.ibb.co/8LMyLZKy/image.png",
            type: "normal",
        },
        {
            id: 2,
            price: 100,
            name: "Galaxy Miner",
            time: "100 star/hour",
            img: "https://i.ibb.co/8LMyLZKy/image.png",
            type: "normal",
        },
        {
            id: 3,
            name: "Referral Miner",
            time: "250 star/hour",
            img: "https://i.ibb.co/8LMyLZKy/image.png",
            requiredReferrals: 10,
            type: "referral",
        },
    ];

    return (
        <div>
            <h1 className="text-center" style={{ marginTop: "50px" }}>
                ⛏️ Miner
            </h1>

            {modalData.type === "normal" ? (
                <PurchaseModal
                    show={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={handleBuy(modalData.id || 0)}
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

            <div className="text-center" id="miners">
                {minersData.map((el, i) => (
                    <MinerItem
                        data={el}
                        setModalOpen={setModalOpen}
                        setModalData={setModalData}
                        userReferralCount={userReferralCount}
                        key={i}
                    />
                ))}
            </div>
        </div>
    );
};
