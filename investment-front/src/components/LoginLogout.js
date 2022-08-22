import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "rsuite";
import ROLE from "../interfaces/Role";


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

        {/* Register - Display if not logged in or is admin */}
        {
            (!user || user.role === ROLE.ROLE_ADMIN ) &&
            <Button appearance="primary" color='violet' onClick={() => navigate("/register")}>Register</Button>
        }

        {/* Login */}
        {
            !user &&
            <Button appearance="primary" color='violet' onClick={() => navigate("/login")}>Login</Button>
        }

    </div>;
}