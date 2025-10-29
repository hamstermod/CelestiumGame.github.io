import React from "react";
import "./style.css";
import { FaCoins, FaStore, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = ({ page }) => {
    return (
        <footer className="footer">
            <Link
                to="/miners"
                className={`footer-item ${page === "miners" ? "active" : ""}`}
            >
                <FaCoins className="footer-icon" />
                <span>Miners</span>
            </Link>

            <Link
                to="/market"
                className={`footer-item ${page === "market" ? "active" : ""}`}
            >
                <FaStore className="footer-icon" />
                <span>Market</span>
            </Link>

            <Link
                to="/profile"
                className={`footer-item ${page === "profile" ? "active" : ""}`}
            >
                <FaUser className="footer-icon" />
                <span>Profile</span>
            </Link>
        </footer>
    );
};

export default Footer;
