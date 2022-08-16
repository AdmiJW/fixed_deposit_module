import React, { useState, createContext, useCallback } from "react";

export const AppContext = createContext({});


// Top level states that is provided to everywhere in the application
// Includes:
//  1. Breadcrumb
//  2. Alerts
export const AppProvider = props => {
    const [crumb, setCrumb] = useState([]);
    const [danger, setDanger] = useState(null);
    const [info, setInfo] = useState(null);
    const [warning, setWarning] = useState(null);
    const [success, setSuccess] = useState(null);

    
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



    const appContextObject = {
        crumb, setCrumb,
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