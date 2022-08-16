import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';


import { RouteList } from '../Router.js';

export default function Sidebar() {

    return (
        <div id="sidebar-wrapper">
            <div className="list-group list-group-flush">
                <div className="accordion sidebar" id="accordionSidebar">

                    {/* Determine whether a route shall be displayed using route.displayInSidebar boolean */}
                    {/* See Router.js */}
                    {
                        RouteList.map((route, i) =>
                            route.displayInSidebar ?
                            <div className="card" key={i}>
                                <div className="card-header main p-0">
                                    <NavLink to={route.sideBarPath} className="text-white main-link text-decoration-none">
                                        {route.name}
                                    </NavLink>
                                </div>
                            </div>
                            : null
                        )
                    }
                </div>
            </div>
        </div>
    );
}
