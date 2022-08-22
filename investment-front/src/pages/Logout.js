import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from "../AppContext";
import LoadingScreen from '../components/screen/LoadingScreen';
import SimpleMessageScreen from '../components/screen/SimpleMessageScreen';
import { logout } from '../services/authAPI';


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

    return <SimpleMessageScreen
        icon={["fas", "fa-check-circle", 'text-success']}
        message="Successfully logged out!"
        links={<Link to="/login" className="btn btn-primary text-decoration-none">Login</Link>}
    />
}
