import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Sidebar from './layouts/Sidebar';
import MainNavbar from './layouts/MainNavbar';
import SubNavbar from './layouts/SubNavbar';
import Router from './Router.js';
import { AppProvider } from './AppContext';
import LoadControl from './components/LoadControl';


const App = () => {
    return (
    <BrowserRouter >
        <AppProvider>
            <MainNavbar />   
            <LoadControl>
                <Sidebar />
                <div id="page-content-wrapper">
                    <SubNavbar />
                    <Router />
                </div>
            </LoadControl>
        </AppProvider>
    </BrowserRouter>
    );
}

export default App;