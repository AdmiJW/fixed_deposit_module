import React from "react";

import '../../style/LoadingScreen.css';



export default function LoadingScreen({ text }) {

    return (
    <div className='d-flex flex-column justify-content-center align-items-center my-5'>

        <div className="blockspin-container">
            <div style={{ left: '38px', top: '38px', animationDelay: '0s' }} ></div>
            <div style={{ left: '80px', top: '38px', animationDelay: '0.125s' }} ></div>
            <div style={{ left: '122px', top: '38px', animationDelay: '0.25s' }} ></div>
            <div style={{ left: '38px', top: '80px', animationDelay: '0.875s' }} ></div>
            <span></span>
            <div style={{ left: '122px', top: '80px', animationDelay: '0.375s' }} ></div>
            <div style={{ left: '38px', top: '122px', animationDelay: '0.75s' }} ></div>
            <div style={{ left: '80px', top: '122px', animationDelay: '0.625s' }} ></div>
            <div style={{ left: '122px', top: '122px', animationDelay: '0.5s' }} ></div>
        </div>

        <span className='text-muted lead mt-3'>{ text }</span>
    </div>
    );

}