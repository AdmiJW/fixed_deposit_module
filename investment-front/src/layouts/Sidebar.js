import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Sidenav, Nav } from 'rsuite';


import { RouteList } from '../Router.js';

export default function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();


    return <div id='sidebar-wrapper'>
        <Sidenav 
            appearance='inverse'
            style={{ width: '260px', height: '100%' }}
        >
            <Sidenav.Body>
                <Nav activeKey={location.pathname}>

                    {/* Determine whether a route shall be displayed using route.displayInSidebar boolean */}
                    {/* See Router.js */}
                    {
                        RouteList.map((route) =>
                            route.displayInSidebar &&
                            <Nav.Item 
                                key={route.sideBarPath}
                                eventKey={route.sideBarPath}
                                onClick={()=> navigate( route.sideBarPath )} 
                                icon={route.icon}
                            >
                                { route.name }
                            </Nav.Item>
                        )
                    }
                </Nav>
            </Sidenav.Body>
        </Sidenav>
    </div>
}
