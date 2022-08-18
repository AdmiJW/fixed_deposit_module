import React, { useState, useContext, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from "../AppContext";
import LoadingScreen from '../components/LoadingScreen';
import { login } from '../services/restServer';
import LoginForm from '../components/LoginForm';




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


    return (
        <div className="text-center mt-4 mb-4">
            <i className="fas fa-check-circle fs-1 text-success mb-3"></i>
            <div className="my-3 lead">Logged in!</div>
            <Link to="/fd" className='btn btn-primary text-decoration-none' >View Fixed Deposits</Link>
        </div>
    );
}
