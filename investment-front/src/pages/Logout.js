import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from "../AppContext";
import LoadingScreen from '../components/LoadingScreen';
import { logout } from '../services/restServer';


export default function Logout() {
    const { setCrumb, setUser, setDanger } = useContext(AppContext);
    const [ isLoggedOut, setIsLoggedOut ] = useState(false);

    useLayoutEffect(() => {
        setCrumb([{ name: "Log out" }]);
    }, [setCrumb]);


    useEffect(()=> {
        logout({
            onSuccess: () => {
                setUser(null);
                setIsLoggedOut(true);
            },
            onFailure: (err) => {
                console.dir(err);
                setDanger( err.message );
            }
        });
    }, [setDanger, setUser]);


    if (!isLoggedOut) return <LoadingScreen text="Logging out..." />;

    return (
        <div className="text-center mt-4 mb-4">
            <i className="fas fa-check-circle fs-1 text-success mb-3"></i>
            <div className="my-3 lead">Successfully logged out!</div>
            <Link to="/login" className='btn btn-primary text-decoration-none' >Return to Home</Link>
        </div>
    );
}
