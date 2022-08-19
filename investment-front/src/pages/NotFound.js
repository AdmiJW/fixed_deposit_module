import React, { useContext, useLayoutEffect } from 'react';
import { AppContext } from "../AppContext";
import { Link } from 'react-router-dom';

import SimpleMessageScreen from '../components/screen/SimpleMessageScreen';



export default function NotFound() {
    const { setCrumb } = useContext(AppContext);

    useLayoutEffect(() => {
        setCrumb([{ name: "Not Found" }]);
    }, [setCrumb]);


    return <SimpleMessageScreen
        icon={["fas", "fa-exclamation-triangle", 'text-warning']}
        title="404 - Page Not Found"
        message={ 
            <>
                The page you are requesting is not found in the system 
                <br/> 
                Click the button below to return 
            </>
        }
        links={<Link to="/fd" className="btn btn-primary text-decoration-none">Back</Link>}
    />;
}
