import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "rsuite";


export default function LoginLogout({ user }) {
    const navigate = useNavigate();
    
    return <div className="d-flex align-items-center justify-content-end flex-grow-1 gap-2">

        {/* Greeting & Logout button */}
        {
            user && <>
                <span className="fs-6">Hi, <b>{ user.username }</b></span> 
                <Button appearance="primary" color='violet' onClick={()=> navigate("/logout")}>Logout</Button>
            </> 
        }

        {/* Login & Register */}
        {
            !user &&
            <>
                <Button appearance="primary" color='violet' onClick={() => navigate("/login")}>Login</Button>
                <Button appearance="primary" color='violet' onClick={() => navigate("/register")}>Register</Button>
            </>
        }
    </div>;
}