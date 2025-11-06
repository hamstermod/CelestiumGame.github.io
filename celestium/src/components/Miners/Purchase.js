// PurchaseModal.jsx
import React from "react";
import { ReactComponent as Star } from "../../images/star.svg";

export default function PurchaseModal({ show, onClose, onConfirm, itemName, price, sendReq }) {
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
                        boxShadow: "0 0 20px rgba(60,120,255,0.5), 0 8px 30px rgba(0,0,50,0.5)",
                        border: "1px solid rgba(60,120,255,0.3)",
                        transition: "all 0.3s ease",
                    }}
                >
                    <div className="modal-header border-0">
                        <h5 className="modal-title text-warning fw-bold">Confirm Purchase</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p className="mb-0 text-light">
                            Are you sure you want to buy <strong>{itemName}</strong> for{" "}
                            <Star width={18} height={18} /> {price}?
                        </p>
                    </div>
                    <div className="modal-footer border-0">
                        <button
                            type="button"
                            className="btn btn-secondary fw-bold"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-warning text-dark fw-bold shadow"
                            style={{
                                transition: "all 0.2s",
                                cursor: "pointer",
                                boxShadow: "0 0 10px rgba(255,220,100,0.6)",
                                animation: "pulse 1.5s infinite",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            onClick={onConfirm}
                        >
                            Buy
                        </button>
                    </div>
                </div>
            </div>

            {/* Inline keyframes для pulsating кнопки */}
            <style>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 10px rgba(255,220,100,0.6); }
                    50% { box-shadow: 0 0 20px rgba(255,220,100,0.8); }
                    100% { box-shadow: 0 0 10px rgba(255,220,100,0.6); }
                }
            `}</style>
        </div>
    );
}
