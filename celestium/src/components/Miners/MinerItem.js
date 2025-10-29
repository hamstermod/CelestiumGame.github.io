import React from "react";
import { ReactComponent as Star } from "../../images/star.svg";
import { FaUserFriends, FaLock } from "react-icons/fa";

export default function StarMinerCard({
                                          setModalOpen,
                                          data,
                                          setModalData,
                                          userReferralCount,
                                      }) {
    const { price, name, time, img, type, requiredReferrals } = data;

    const isReferralItem = type === "referral";
    const canClaim = !isReferralItem || userReferralCount >= requiredReferrals;

    const handleClick = () => {
        if (!canClaim) return;
        setModalOpen(true);
        setModalData(data);
    };

    return (
        <div
            className="container my-3 p-4 rounded-4 d-flex align-items-center justify-content-between position-relative"
            style={{
                background: "linear-gradient(180deg, #0b102b 0%, #07091c 100%)",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow:
                    "0 0 25px rgba(0, 10, 80, 0.4), inset 0 0 12px rgba(60, 90, 255, 0.15)",
                color: "#fff",
                transition: "all 0.3s ease",
                cursor: canClaim ? "pointer" : "not-allowed",
                opacity: canClaim ? 1 : 0.6,
                overflow: "hidden",
            }}
            onClick={handleClick}
        >
            {!canClaim && (
                <FaLock
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "2rem",
                        color: "rgba(255,100,100,0.4)",
                        animation: "lockFade 2s infinite ease-in-out",
                        zIndex: 1,
                    }}
                />
            )}
            <div
                className="d-flex align-items-center justify-content-center rounded-3 p-2"
                style={{
                    flex: "0 0 auto",
                    background:
                        "radial-gradient(circle at 50% 50%, rgba(60,90,255,0.15), rgba(0,0,0,0.05))",
                    boxShadow: "0 0 20px rgba(60, 90, 255, 0.2)",
                }}
            >
                <img
                    src={img}
                    alt="Miner"
                    style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "80px",
                        objectFit: "contain",
                        filter: "drop-shadow(0 0 8px rgba(100,150,255,0.35))",
                    }}
                />
            </div>

            {/* Miner Info */}
            <div
                className="ms-3 flex-grow-1 d-flex flex-column align-items-center justify-content-center"
                style={{ minWidth: "160px" }}
            >
                <h5
                    style={{
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        marginBottom: "4px",
                        color: "#fff",
                    }}
                >
                    {name}
                </h5>
                <p
                    style={{
                        margin: 0,
                        color: "rgba(180, 190, 255, 0.7)",
                        fontSize: "0.9rem",
                        marginBottom: "12px",
                    }}
                >
                    {time}
                </p>

                {/* Price / Referral Requirement */}
                {isReferralItem ? (
                    <div
                        className="d-inline-flex align-items-center rounded-pill px-4 py-2 mb-2 position-relative"
                        style={{
                            background: canClaim
                                ? "linear-gradient(90deg, rgba(80,255,160,0.25), rgba(60,255,190,0.15))"
                                : "linear-gradient(90deg, rgba(255,120,120,0.2), rgba(255,100,100,0.1))",
                            border: canClaim
                                ? "1px solid rgba(100,255,150,0.4)"
                                : "1px solid rgba(255,100,100,0.25)",
                            boxShadow: canClaim
                                ? "0 0 15px rgba(100,255,150,0.3), inset 0 0 10px rgba(100,255,180,0.15)"
                                : "0 0 12px rgba(255,100,100,0.2), inset 0 0 6px rgba(255,80,80,0.1)",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            color: canClaim ? "#6effa8" : "#ff6b6b",
                            gap: 8,
                            transition: "all 0.3s ease",
                            transform: canClaim ? "scale(1.02)" : "none",
                        }}
                    >
            <span style={{ position: "relative", zIndex: 2 }}>
              <FaUserFriends size={18} style={{marginRight: "5px"}} />
                {canClaim
                    ? "Claim Available"
                    : `Need ${requiredReferrals} Referrals`}
            </span>


                    </div>
                ) : (
                    <div
                        className="d-inline-flex align-items-center rounded-pill px-4 py-2 mb-2"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(255,210,100,0.25), rgba(255,190,80,0.1))",
                            border: "1px solid rgba(255,210,100,0.3)",
                            boxShadow:
                                "0 0 15px rgba(255,200,80,0.3), inset 0 0 8px rgba(255,220,120,0.2)",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            color: "#ffcf6b",
                            gap: 8,
                        }}
                    >
                        <Star width={18} height={18} />
                        {price}
                    </div>
                )}
            </div>

            <style>{`
        @keyframes lockFade {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
        </div>
    );
}
