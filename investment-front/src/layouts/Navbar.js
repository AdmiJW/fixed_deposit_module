import React, { useContext } from 'react';
import { RouteList } from '../Router.js';
import { AppContext } from "../AppContext";

import { Button } from 'rsuite';


export default function Navbar() {

    const toggleSidebar = (e) => {
        e.preventDefault();
        document.getElementById('wrapper').classList.toggle('toggled');
    };



    const { crumb, info, warning, success, danger } = useContext(AppContext);
    const crumbList = [{
        name: RouteList[0].name,
        route: RouteList[0].path
    }, ...crumb]



    return (
        <React.Fragment>
            {/* Navbar consisting of breadcrumb */}
            <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
                
                <Button appearance="primary" color='violet' onClick={toggleSidebar}>
                    <i className="fas fa-align-left"></i> Menu
                </Button>

                <ol className="breadcrumb ms-4 me-4">

                    {
                        crumbList.map((crumb, i) => (
                            <React.Fragment key={i}>
                                <li className="breadcrumb-item">
                                    <span to={crumb.route} className="crumb" 
                                        onClick={() => { localStorage.setItem('sbState', 0) }}
                                    >
                                        {crumb.name}
                                    </span>
                                </li>
                            </React.Fragment>
                        ))
                    }
                </ol>
            </nav>

            {/* The title of page */}
            <div className="page-header shadow">{crumbList[crumbList.length - 1]?.name.toUpperCase()}</div>
            
            {/* Alerts */}
            { info? <div className="alert alert-info mb-1" role="alert">{info}</div> : null }
            { warning? <div className="alert alert-warning mb-1" role="alert">{warning}</div> : null }
            { success? <div className="alert alert-success mb-1" role="alert">{success}</div> : null }
            { danger? <div className="alert alert-danger mb-1" role="alert">{danger}</div> : null }
        </React.Fragment>
    );
}
