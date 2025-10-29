import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { ReactComponent as Star } from "../../images/star.svg";

export default function Profile({ setCurrentPage }) {
    setCurrentPage("profile");

    const [popupMiner, setPopupMiner] = useState(null);
    const [claimedMiners, setClaimedMiners] = useState([]);

    const miners = [
        {
            id: 1,
            name: "Star Miner",
            rate: "10 star/hour",
            reward: 50,
            img: "https://i.ibb.co/8LMyLZKy/image.png",
        },
    ];

    const handleCardClick = (miner) => {
        if (!claimedMiners.includes(miner.id)) {
            setPopupMiner(miner);
        }
    };

    const handleClaimReward = () => {
        if (popupMiner) {
            setClaimedMiners((prev) => [...prev, popupMiner.id]);
            setPopupMiner("claimed");
            setTimeout(() => setPopupMiner(null), 1500);
        }
    };

    const handleClosePopup = () => setPopupMiner(null);

    return (
        <div
            className="d-flex flex-column align-items-center text-center min-vh-100 text-light"
            style={{
                paddingBottom: "100px",
                position: "relative",
                background: "radial-gradient(circle at top, #0d0f27, #050818)",
                fontFamily: "'Orbitron', sans-serif",
            }}
        >

            {/* ==== PROFILE ==== */}
            <div className="pt-5 pb-4 mt-4">
                <h2
                    className="fw-bold mb-4"
                    style={{
                        color: "#FFD84D",
                        textShadow: "0 0 20px #FFD84D, 0 0 40px #FFA500",
                        fontSize: "2rem",
                    }}
                >
                    Profile
                </h2>

                {/* Avatar */}
                <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                        width: "110px",
                        height: "110px",
                        background: "linear-gradient(145deg, #1E1F4F, #0F1232)",
                        boxShadow: "0 0 20px #FFD700, inset 0 0 15px rgba(0,0,0,0.6)",
                        border: "2px solid #FFD700",
                        transition: "all 0.3s ease",
                    }}
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="User avatar"
                        style={{ width: "60px", transition: "transform 0.3s" }}
                        className="avatar-hover"
                    />
                </div>

                {/* Username */}
                <div
                    className="px-3 py-2 rounded-pill mb-4"
                    style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        fontSize: "0.9rem",
                        color: "rgba(255,255,255,0.9)",
                        letterSpacing: "0.5px",
                        textShadow: "0 0 5px rgba(255,255,255,0.3)",
                    }}
                >
                    telegram.me/your_username
                </div>

                {/* Stats */}
                <div
                    className="rounded-4 p-4 mx-auto"
                    style={{
                        width: "340px",
                        background: "linear-gradient(145deg, #141945, #0A0C28)",
                        boxShadow: "0 0 20px rgba(255,215,0,0.3), inset 0 0 10px rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,215,0,0.2)",
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center gap-2">
                            <FaUserFriends size={20} color="#FFD84D" />
                            <span>Referrals</span>
                        </div>
                        <span className="fw-bold text-warning">14</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                            <Star width={20} height={20} fill="#FFD700" />
                            <span>Stars per day</span>
                        </div>
                        <span className="fw-bold text-warning">10</span>
                    </div>
                </div>
            </div>

            {/* ==== INVENTORY ==== */}
            <div
                className="w-100 d-flex flex-column align-items-center pt-4 pb-5"
                style={{
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    background: "linear-gradient(180deg, #0A0F29, #050822)",
                }}
            >
                <h4
                    className="fw-bold mb-4"
                    style={{
                        color: "#FFD84D",
                        textShadow: "0 0 15px #FFD84D, 0 0 25px #FFA500",
                    }}
                >
                    Inventory
                </h4>

                {miners.map((m) => {
                    const claimed = claimedMiners.includes(m.id);
                    return (
                        <div
                            key={m.id}
                            className={`d-flex align-items-center justify-content-between p-3 rounded-4 ${
                                claimed ? "opacity-50" : "cursor-pointer hover-scale"
                            }`}
                            style={{
                                background: claimed
                                    ? "rgba(20,20,50,0.6)"
                                    : "linear-gradient(145deg, #1A1C4F, #10123C)",
                                boxShadow: claimed
                                    ? "0 0 10px rgba(0,0,0,0.5)"
                                    : "0 0 15px #FFD700, inset 0 0 10px rgba(255,215,0,0.3)",
                                width: "340px",
                                marginBottom: "15px",
                                transition: "all 0.3s ease",
                            }}
                            onClick={() => !claimed && handleCardClick(m)}
                        >
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src={m.img}
                                    alt={m.name}
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: "#0A0E2A",
                                        padding: "5px",
                                        borderRadius: "14px",
                                        boxShadow: "0 0 10px #FFD700",
                                        transition: "transform 0.3s",
                                    }}
                                    className="img-hover"
                                />
                                <div className="text-start">
                                    <div
                                        className="fw-bold"
                                        style={{
                                            fontSize: "1rem",
                                            color: claimed ? "#aaa" : "#fff",
                                        }}
                                    >
                                        {m.name}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "0.85rem",
                                            color: claimed
                                                ? "rgba(255,255,255,0.3)"
                                                : "rgba(255,255,255,0.6)",
                                        }}
                                    >
                                        {m.rate}
                                    </div>
                                </div>
                            </div>

                            <div
                                className="px-3 py-2 rounded-pill d-flex align-items-center gap-2"
                                style={{
                                    background: claimed
                                        ? "rgba(255,255,255,0.1)"
                                        : "linear-gradient(90deg, #FFE600, #FFB400)",
                                    color: claimed ? "#888" : "#000",
                                    fontWeight: "bold",
                                    boxShadow: claimed ? "none" : "0 0 10px #FFD700",
                                }}
                            >
                                <Star
                                    width={16}
                                    height={16}
                                    fill={claimed ? "#888" : "#000"}
                                />
                                <span>{m.reward}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ==== POPUPS ==== */}
            {popupMiner && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{
                        background: "rgba(0,0,0,0.7)",
                        backdropFilter: "blur(8px)",
                        zIndex: 999,
                    }}
                >
                    <div
                        className="rounded-4 text-center p-4"
                        style={{
                            background: "linear-gradient(145deg, #141945, #0A0C28)",
                            boxShadow: "0 0 25px #FFD700",
                            width: "300px",
                            color: "#FFD84D",
                            fontWeight: "600",
                            textShadow: "0 0 8px #FFD700",
                        }}
                    >
                        {popupMiner === "claimed" ? (
                            "🎉 Reward claimed!"
                        ) : (
                            <>
                                <div className="mb-3">Claim reward from this miner?</div>
                                <div className="d-flex justify-content-center gap-3">
                                    <button
                                        onClick={handleClaimReward}
                                        style={{
                                            background: "linear-gradient(90deg, #FFE600, #FFB400)",
                                            color: "#000",
                                            border: "none",
                                            padding: "10px 20px",
                                            borderRadius: "14px",
                                            fontWeight: "bold",
                                            boxShadow: "0 0 15px #FFD700",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={handleClosePopup}
                                        style={{
                                            background: "rgba(255,255,255,0.1)",
                                            color: "#fff",
                                            border: "1px solid rgba(255,255,255,0.3)",
                                            padding: "10px 20px",
                                            borderRadius: "14px",
                                            fontWeight: "bold",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        No
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
