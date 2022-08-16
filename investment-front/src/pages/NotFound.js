import React, { useContext, useLayoutEffect } from 'react';
import { AppContext } from "../AppContext";
import { Link } from 'react-router-dom';



export default function NotFound() {
    const { setCrumb } = useContext(AppContext);

    useLayoutEffect(() => {
        setCrumb([{ name: "Not Found" }]);
    }, [setCrumb]);

    return (
        <div className="text-center mt-4 mb-4">
            <i className="fas fa-exclamation-triangle fs-1 text-warning mb-3"></i>
            <div className="display-4">404 - Page Not Found</div>
            <div className="my-3 lead">The page you are requesting is not found in our system<br />Click the button below to return</div>
            <Link to="/fd" className='btn btn-primary text-decoration-none' >Back</Link>
        </div>
    )
}
