import React, { useState, createContext, useCallback, useEffect } from "react";

import { isLoggedIn } from "./services/restServer";

export const AppContext = createContext({});


// Top level states that is provided to everywhere in the application
// Includes:
//  1. Breadcrumb
//  2. Alerts
//  3. Logged in user
export const AppProvider = props => {
    const [crumb, setCrumb] = useState([]);
    const [danger, setDanger] = useState(null);
    const [info, setInfo] = useState(null);
    const [warning, setWarning] = useState(null);
    const [success, setSuccess] = useState(null);
    const [user, setUser] = useState(null);

   
    // We have to useCallback: if context updates, no new version of these functions shall be provided,
    // which cause useEffect infinite loop bug
    // This function will set other alerts to undefined, equivalent to clearing the alerts before
    // showing the new one
    const setAlert = useCallback(({ danger, info, warning, success })=> {
        setDanger(danger);
        setInfo(info);
        setWarning(warning);
        setSuccess(success);
    }, []);
    const setDangerMsg = useCallback(msg=> setAlert({ danger: msg }), [setAlert]);
    const setInfoMsg = useCallback(msg=> setAlert({ info: msg }), [setAlert]);
    const setWarningMsg = useCallback(msg=> setAlert({ warning: msg }), [setAlert]);
    const setSuccessMsg = useCallback(msg=> setAlert({ success: msg }), [setAlert]);

 
    // On application startup, try to see if user is logged in already from previous session
    useEffect(()=> {
        isLoggedIn({
            onSuccess: (user) => setUser(user),
            onFailure: (err) => {
                if (err.status !== 401) {
                    console.error(err);
                    setDangerMsg( err.message );
                }
            },
        });
    }, [setDangerMsg]);


    // Every 5 minute, poll the server to update authentication status
    useEffect(()=> {
        if (!user) return;  // No need to poll if user is not logged in
        const interval = setInterval(()=> {
            console.dir("Polling server for authentication status...");
            isLoggedIn({
                onSuccess: (user) => setUser(user),
                onFailure: (err) => {
                    if (err.status === 401 && user) {
                        setUser(null);
                        setDangerMsg( "Session timed out. Please log in again" );
                    }
                },
            });
        }, 1000 * 30 * 5 );

        return ()=> clearInterval(interval);
    }, [setDangerMsg, user]);


    const appContextObject = {
        crumb, setCrumb,
        user, setUser,
        danger,
        info,
        warning, 
        success,
        setDanger: setDangerMsg,
        setInfo: setInfoMsg,
        setWarning: setWarningMsg,
        setSuccess: setSuccessMsg,
    };

    return <AppContext.Provider value={appContextObject}>{props.children}</AppContext.Provider>;
};