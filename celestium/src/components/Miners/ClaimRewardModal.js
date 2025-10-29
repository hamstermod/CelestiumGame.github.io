import React from "react";
import { FaGift, FaUserFriends } from "react-icons/fa";

export default function ClaimRewardModal({ show, onClose, onConfirm, itemName }) {
    if (!show) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            onClick={handleOverlayClick}
            style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                transition: "all 0.3s ease",
            }}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div
                    className="modal-content rounded-4 shadow-lg border-0 p-3"
                    style={{
                        background: "linear-gradient(145deg, #0b0f2b, #070918)",
                        boxShadow:
                            "0 0 20px rgba(60,255,150,0.5), 0 8px 30px rgba(0,0,50,0.5)",
                        border: "1px solid rgba(100,255,150,0.3)",
                        transition: "all 0.3s ease",
                    }}
                >
                    <div className="modal-header border-0">
                        <h5 className="modal-title text-success fw-bold">
                            Claim Reward
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body text-center">
                        <FaGift
                            size={50}
                            color="#6effa8"
                            className="mb-3"
                            style={{ filter: "drop-shadow(0 0 6px rgba(100,255,150,0.5))" }}
                        />
                        <p className="mb-0 text-light">
                            🎉 Congratulations, Explorer! <br/>
                            You’ve unlocked <strong>{itemName}</strong>. br
                            Claim your exclusive reward now!
                        </p>
                        <div
                            className="d-inline-flex align-items-center mt-3 rounded-pill px-4 py-2"
                            style={{
                                background:
                                    "radial-gradient(circle at 30% 40%, rgba(100,255,150,0.25), rgba(100,255,150,0.1))",
                                border: "1px solid rgba(100,255,150,0.3)",
                                fontWeight: 700,
                                fontSize: "0.95rem",
                                color: "#6effa8",
                                gap: 8,
                            }}
                        >
                            <FaUserFriends /> Referral Reward
                        </div>
                    </div>

                    <div className="modal-footer border-0">
                        <button
                            type="button"
                            className="btn btn-secondary fw-bold"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn text-dark fw-bold shadow"
                            style={{
                                background: "linear-gradient(90deg, #00ffae, #72ffe0)",
                                transition: "all 0.2s",
                                cursor: "pointer",
                                boxShadow: "0 0 15px rgba(0,255,180,0.6)",
                                animation: "pulse 1.5s infinite",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            onClick={onConfirm}
                        >
                            Claim
                        </button>

                    </div>
                </div>
            </div>

            {/* Анимация кнопки */}
            <style>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 10px rgba(100,255,150,0.6); }
                    50% { box-shadow: 0 0 20px rgba(100,255,150,0.8); }
                    100% { box-shadow: 0 0 10px rgba(100,255,150,0.6); }
                }
            `}</style>
        </div>
    );
}
