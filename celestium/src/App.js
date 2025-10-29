import React, {useState} from "react";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Miners from "./components/Miners/Miners";
import Market from "./components/Market/Market";
import Profile from "./components/Profile/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { ReactComponent as Star } from "./images/star.svg";





function App() {
    // Например, ты можешь сам определить текущую страницу
    const [currentPage, setCurrentPage] = useState("miners"); // "market" или "profile"

    return (
        <div className="App">
            <div
                className="position-absolute top-0 end-0 mt-4 me-4 px-3 py-2 rounded-pill d-flex align-items-center gap-2"
                style={{
                    background: "rgba(255,255,255,0.05)",
                    boxShadow: "inset 0 0 10px rgba(255,255,255,0.1), 0 0 15px #000",
                    color: "#FFD700",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                }}
            >
                <span>100</span>
                <Star width={16} height={16} fill="#FFD700"/>
            </div>

            <div className="container" style={{paddingBottom: "60px"}}>
                <Routes>
                    <Route path="/" element={<Miners setCurrentPage={setCurrentPage}/>}/>
                    <Route path="/miners" element={<Miners setCurrentPage={setCurrentPage}/>}/>
                    <Route path="/market" element={<Market setCurrentPage={setCurrentPage}/>}/>
                    <Route path="/profile" element={<Profile setCurrentPage={setCurrentPage}/>}/>
                </Routes>
            </div>
            <Footer page={currentPage}></Footer>
        </div>
    );
}

export default App;
