import React, {useEffect, useState} from "react";
import Footer from "./components/Footer/Footer";
import {BrowserRouter, Routes, Route, createSearchParams} from "react-router-dom";
import Miners from "./components/Miners/Miners";
import Market from "./components/Market/Market";
import Profile from "./components/Profile/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import Notification from "./components/Notification";
import "./App.css";
import loading from "./images/loading.png";
import { ReactComponent as Star } from "./images/star.svg";

function App() {
    const [currentPage, setCurrentPage] = useState("miners");
    const [stars, setStars] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [amount, setAmount] = useState("");
    const [notification, sendNotification] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [userInit, setInitData] = useState('');
    const [userReferralCount, setUserReferralCount] = useState(0);
    const [miners, setMinersData] = useState([]);
    const [updateMe, setUpdateMe] = useState(0);
    const [displayLoadingPage, setDisplayLoadingPage] = useState(true);
    const sendReq = async (path, paramsObject = {}) => {
        const url = "https://celestiumserver-production.up.railway.app/" + path;
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                initData: userInit,
                ...paramsObject
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const data = await fetch(url, requestOptions)
                .then(async function (e) {
                    const d = await e.json();
                    return {ok: true, data: d};
                })
                .catch(function (e) {
                    return {ok: false};
                });
            console.log(data)
            return data;

        } catch (error) {
            console.log(error)
            return { ok: false };
        }
    };
    useEffect(() => {
        if(displayLoadingPage === true){
            setTimeout(() => {
                setDisplayLoadingPage(false);
            }, 3000)

        }
    }, [displayLoadingPage]);
    useEffect(() => {
        setDisplayLoadingPage(true);
    }, [currentPage]);
    useEffect(() => {
        const fetchData = async () => {
            if(!userInit){
                return;
            }
            let data = await sendReq("me");
            if (data.ok === false) {
                return;
            }
            data = data.data;
            setUserReferralCount(data.refCount);
            setStars(data.stars);
            setMinersData(data.inventory);
        };

        fetchData();
    }, [userInit, updateMe]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            function parseQuery(query) {
                try{
                    const params = new URLSearchParams(query);
                    const result = {};

                    for (const [key, value] of params.entries()) {
                        result[key] = value;
                    }

                    if (result.user) {
                        try {
                            result.user = JSON.parse(decodeURIComponent(result.user));
                        } catch (e) {
                            // createMessage(text.errorParsing + " " + e, 0);
                            console.error("Ошибка при парсинге user JSON:", e);
                        }
                    }

                    return result;
                }catch(el){
                    return {user: {id: 1}};
                }
            }

            if (window.Telegram?.WebApp ) {
                const tg = window.Telegram.WebApp;
                tg.ready(); // важно вызвать
                const search = window.Telegram?.WebApp?.initData;
                setInitData(search);
                const info =  parseQuery(search );
                // localStorage.setItem("init", (search || localStorage.getItem("init")));
                setUserInfo(info);
                // console.log("Telegram WebApp initialized", tg);
            }
        };
    }, []);
    const handleTopUp = async  () => {
        const num = parseInt(amount);
        if (num >= 1 && num <= 10000) {
            try {
                const data = await sendReq("deposit", { stars: num });
                if (data.ok && data.data.ok) {
                    window.Telegram.WebApp.openInvoice(data.data.invoice, (e) => {
                        if (e === "paid") {
                            sendNotification("✅ Payment successful!");
                            setUpdateMe(updateMe + 1);
                        } else {
                            sendNotification("❌ Payment failed!");
                        }
                        setAmount("");
                        setShowPopup(false);
                        setAmount("");
                    });
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <div className="App">
            <Notification notification={notification} sendNotification={sendNotification}/>
            {/* КНОПКА СО ЗВЁЗДАМИ */}
            <div
                onClick={() => setShowPopup(true)}
                className="position-absolute top-0 end-0 mt-4 me-4 px-3 py-2 rounded-pill d-flex align-items-center gap-2"
                style={{
                    background: "rgba(255,255,255,0.08)",
                    boxShadow: "inset 0 0 10px rgba(255,255,255,0.2), 0 0 15px #000",
                    color: "#FFD700",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    transition: "0.3s",
                    zIndex: 100,
                }}
            >
                <span>{stars}</span>
                <Star width={16} height={16} fill="#FFD700" />
            </div>

            {/* POPUP */}
            {showPopup && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        background: "rgba(0,0,0,0.6)",
                        backdropFilter: "blur(8px)",
                        zIndex: 999,
                        animation: "fadeIn 0.3s ease",
                    }}
                    onClick={() => setShowPopup(false)}
                >
                    <div
                        className="p-4 rounded-4 position-relative"
                        style={{
                            background: "rgba(30,30,30,0.9)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "white",
                            width: "300px",
                            boxShadow: "0 0 25px rgba(255,215,0,0.2)",
                            animation: "popupAppear 0.3s ease",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Кнопка закрытия */}
                        <button
                            onClick={() => setShowPopup(false)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "12px",
                                background: "transparent",
                                border: "none",
                                color: "white",
                                fontSize: "1.2rem",
                                cursor: "pointer",
                            }}
                        >
                            ✖
                        </button>

                        <h5
                            className="text-center mb-3"
                            style={{
                                color: "#FFD700",
                                textShadow: "0 0 8px rgba(255,215,0,0.5)",
                            }}
                        >
                            Top-Up Stars ⭐
                        </h5>

                        <input
                            type="number"
                            min="1"
                            max="10000"
                            placeholder="Enter the quantity (1–100000)"
                            className="form-control mb-3 text-center white-placeholder"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                color: "white",
                                borderRadius: "15px",
                                fontSize: "0.95rem",
                            }}
                        />

                        <button
                            onClick={handleTopUp}
                            className="btn w-100"
                            style={{
                                background: "linear-gradient(90deg, #FFD700, #FFA500)",
                                color: "black",
                                fontWeight: "600",
                                borderRadius: "25px",
                                boxShadow: "0 0 10px rgba(255,215,0,0.5)",
                                transition: "0.3s",
                            }}
                        >
                            Top Up
                        </button>
                    </div>
                </div>
            )}

            {/* Стили */}
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes popupAppear {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                .white-placeholder::placeholder {
                    color: rgba(255,255,255,0.8);
                }
                `}
            </style>
            <div style={{width:'100vw', height:'100vh', position: "fixed", top: 0, left: 0,zIndex: 9999, backgroundImage: `url("${loading}")`, backgroundSize: "cover", backgroundPosition: "center", display: (displayLoadingPage ?"block" : "none")}}>
            </div>
            <div className="container" style={{ paddingBottom: "60px" }}>
                <Routes>
                    <Route path="/" element={<Miners updateMe={updateMe} setUpdateMe={setUpdateMe} sendReq={sendReq}  stars={stars} sendNotification={sendNotification} userReferralCount={userReferralCount} userInit={userInit}  setCurrentPage={setCurrentPage} />} />
                    <Route path="/miners" element={<Miners updateMe={updateMe} setUpdateMe={setUpdateMe} sendReq={sendReq}  stars={stars} sendNotification={sendNotification} userReferralCount={userReferralCount} userInit={userInit}  setCurrentPage={setCurrentPage} />} />
                    <Route path="/market" element={<Market stars={stars}  updateMe={updateMe} setUpdateMe={setUpdateMe} sendNotification={sendNotification} userReferralCount={userReferralCount} sendReq={sendReq}  setCurrentPage={setCurrentPage} />} />
                    <Route path="/profile" element={<Profile sendReq={sendReq}  updateMe={updateMe} setUpdateMe={setUpdateMe} sendNotification={sendNotification} userReferralCount={userReferralCount} miners={miners} userInfo={userInfo}  setCurrentPage={setCurrentPage} init={userInit} />} />
                </Routes>
            </div>

            <Footer page={currentPage} />
        </div>
    );
}

export default App;
