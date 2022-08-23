import React, { useContext } from 'react';
import { RouteList } from '../Router.js';
import { AppContext } from "../AppContext";

import { Button, Message } from 'rsuite';
import LoginLogout from '../components/LoginLogout.js';


export default function Navbar() {

    const toggleSidebar = (e) => {
        e.preventDefault();
        document.getElementById('wrapper').classList.toggle('toggled');
    };



    const { crumb, info, warning, success, danger, user } = useContext(AppContext);
    const crumbList = [{
        name: RouteList[0].name,
        route: RouteList[0].path
    }, ...crumb]



    return (
        <React.Fragment>
            {/* Navbar consisting of breadcrumb */}
            <nav className="navbar navbar-expand-lg navbar-light px-1" id="navbar">
                
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

                {/* ! Put login logout component here */}
                <LoginLogout user={user} />
            </nav>

            {/* The title of page */}
            <div className="page-header shadow">{crumbList[crumbList.length - 1]?.name.toUpperCase()}</div>
            
            {/* Alerts */}
            { info? <Message showIcon type='info'>{ info }</Message> : null }
            { warning? <Message showIcon type='warning'>{ warning }</Message> : null }
            { success? <Message showIcon type='success'>{ success }</Message> : null }
            { danger? <Message showIcon type='error' >{ danger }</Message> : null }
        </React.Fragment>
    );
}
