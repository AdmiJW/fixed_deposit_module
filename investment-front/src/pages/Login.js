import React, { useState, useContext, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from "../AppContext";
import LoadingScreen from '../components/screen/LoadingScreen';
import { login } from '../services/restServer';
import LoginForm from '../components/forms/LoginForm';
import SimpleMessageScreen from '../components/screen/SimpleMessageScreen';




export default function Login() {
    const { setCrumb, user, setUser, setDanger } = useContext(AppContext);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ prevUsername, setPrevUsername ] = useState(''); // When user submit once and fail, at least username is not reset

    useLayoutEffect(() => {
        setCrumb([{ name: "Log in" }]);
    }, [setCrumb]);


    function loginHandler( username, password, rememberMe ) {
        setIsLoading(true);
        setPrevUsername(username);
        login({
            username, password, rememberMe,
            onInit: ()=> setDanger(null),
            onSuccess: (user) => setUser(user),
            onFailure: (err) => setDanger( err.message ),
            onFinal: () => setIsLoading(false)
        });
    }



    if (isLoading) return <LoadingScreen text="Logging in..." />;

    // Haven't log in. Display login form
    if (!user) return <LoginForm loginHandler={loginHandler} prevUsername={prevUsername} />;


    return <SimpleMessageScreen
        icon={["fas", "fa-check-circle", 'text-success']}
        message="Logged in!"
        links={<Link to="/fd" className="btn btn-primary text-decoration-none">View Fixed Deposits</Link>}
    />;
}
