import React from "react";

// import React, { useState } from "react";

export default function Notification({ notification, sendNotification }) {
    if(!notification){
        return '';
    }
    setTimeout(() => {
        sendNotification(null)
    }, 2000)
    return (notification ? <div
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
            {notification}
        </div>
    </div> :'');
}
