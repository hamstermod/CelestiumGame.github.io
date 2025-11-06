import React from "react";
import "./style.css";
import { FaCoins, FaStore, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = ({ page, setCurrentPage }) => {
    return (
        <footer className="footer">
            <p
                onClick={() => setCurrentPage("miners")}
                className={`footer-item ${page === "miners" ? "active" : ""}`}
            >
                <FaCoins className="footer-icon" />
                <span>Miners</span>
            </p>

            <p
                onClick={() => setCurrentPage("market")}
                className={`footer-item ${page === "market" ? "active" : ""}`}
            >
                <FaStore className="footer-icon" />
                <span>Market</span>
            </p>

            <p
                onClick={() => setCurrentPage("profile")}
                className={`footer-item ${page === "profile" ? "active" : ""}`}
            >
                <FaUser className="footer-icon" />
                <span>Profile</span>
            </p>
        </footer>
    );
};

export default Footer;
