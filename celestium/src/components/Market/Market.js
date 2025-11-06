import React, { useState } from "react";
import Lottie from "lottie-react";
import "bootstrap/dist/css/bootstrap.min.css";
import bearAnimation from "../../images/bear.json";
import heartAnimation from "../../images/heart.json";
import roseAnimation from "../../images/rose.json";
import giftAnimation from "../../images/gift.json";
import cakeAnimation from "../../images/cake.json";
import bouquetAnimation from "../../images/bouquet.json";

import rocketAnimation from "../../images/rocket.json";
import champagneAnimation from "../../images/champagne.json";
import trophyAnimation from "../../images/trophy.json";
import diamondAnimation from "../../images/diamond.json";
import ringAnimation from "../../images/ring.json";
import { ReactComponent as Star } from "../../images/star.svg";

export default function Market({ setCurrentPage, sendNotification, userReferralCount, stars, sendReq, setUpdateMe, updateMe }) {
    const [show, setShow] = useState(false);
    const [selectedGift, setSelectedGift] = useState(null);

    setCurrentPage("market");

    const gifts = [
        { id: 0, name: "Heart", animation: heartAnimation, price: 15 },
        { id: 1, name: "Teddy Bear", animation: bearAnimation, price: 15 },
        { id: 2, name: "Gift Box", animation: giftAnimation, price: 25 },
        { id: 3, name: "Rose", animation: roseAnimation, price: 25 },
        { id: 4, name: "Birthday Cake", animation: cakeAnimation, price: 50 },
        { id: 5, name: "Bouquet", animation: bouquetAnimation, price: 50 },
        { id: 6, name: "Rocket", animation: rocketAnimation, price: 50 },
        { id: 7, name: "Champagne", animation: champagneAnimation, price: 50 },
        { id: 8, name: "Trophy", animation: trophyAnimation, price: 100 },
        { id: 9, name: "Ring", animation: ringAnimation, price: 100 },
        { id: 10, name: "Diamond", animation: diamondAnimation, price: 100 }
    ];


    const handleShow = (gift) => {
        setSelectedGift(gift);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const cardStyle = {
        background: "linear-gradient(145deg, #0d1b33, #00102a)",
        border: "1px solid #0a1a2e",
        borderRadius: "16px",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
    };

    const cardHover = {
        transform: "translateY(-5px)",
        boxShadow: "0 8px 20px rgba(0, 150, 255, 0.3)",
    };

    const starStyle = {
        width: "20px",
        height: "20px",
        marginRight: "5px",
        transition: "transform 0.3s",
    };

    const starHover = {
        transform: "scale(1.3)",
    };

    return (
        <div className="min-vh-100 py-5 text-center" style={{ color: "#c0c8e0", transition: "filter 0.3s" }}>
            {/* Main content with blur when popup is open */}
            <div style={{ filter: show ? "blur(6px)" : "none" }}>
                <div className="container">
                    <h2 className="mb-4" style={{ textShadow: "1px 1px 5px #000" }}>
                        🎁 Market
                    </h2>

                    <div className="row justify-content-center">
                        {gifts.map((gift, i) => (
                            <div key={i} className="col-6 col-sm-4 col-md-3 mb-4">
                                <div
                                    className="p-3 d-flex flex-column align-items-center marketItem"
                                    style={cardStyle}
                                    onClick={() => handleShow(gift)}
                                >
                                    <div className="mx-auto" style={{ maxWidth: "120px" }}>
                                        <Lottie animationData={gift.animation} loop={true} />
                                    </div>
                                    <div className="mt-2 text-center fw-bold d-flex justify-content-center align-items-center">
                                        <Star
                                            style={starStyle} />
                                        {gift.price}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {show && selectedGift && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1000 }}
                    onClick={handleClose}
                >
                    <div
                        className="d-flex flex-column"
                        style={{
                            background: "linear-gradient(145deg, #0d1b33, #00102a)",
                            border: "1px solid #0a1a2e",
                            color: "#c0c8e0",
                            borderRadius: "12px",
                            maxWidth: "400px",
                            width: "90%",
                            padding: "20px",
                            zIndex: 1001,
                        }}
                        onClick={(e) => e.stopPropagation()} // Stop closing when clicking inside
                    >
                        <div className="modal-header" style={{ borderBottom: "1px solid #0a1a2e", padding: 0, marginBottom: "15px" }}>
                            <h5 className="modal-title">{selectedGift.name}</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={handleClose}
                            ></button>
                        </div>
                        <div className="modal-body text-center">
                            <div className="mx-auto" style={{ maxWidth: "150px" }}>
                                <Lottie animationData={selectedGift.animation} loop={true} />
                            </div>
                            <p className="mb-0 mt-2 fw-bold d-flex justify-content-center align-items-center">
                                Price: <Star style={{ ...starStyle, marginLeft: "8px" }} /> {selectedGift.price}
                            </p>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <button
                                type="button"
                                className="btn btn-outline-light flex-fill me-2"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-light text-dark flex-fill ms-2"
                                onClick={async () => {
                                    handleClose();
                                    if(stars < selectedGift.price) {

                                        sendNotification("Insufficient Balance");

                                        return;
                                    }
                                    if(userReferralCount < 10) {
                                        sendNotification("Minimum requirement: 10 referrals!");

                                        return;
                                    }
                                    const data = await sendReq("buyGift", {id: selectedGift.id});
                                    if(!(data.data.ok)) {
                                        sendNotification(data.data.message);
                                        return;
                                    }
                                    sendNotification("SUCCESS");
                                    setUpdateMe(updateMe + 1);

                                }}
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
