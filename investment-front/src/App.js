import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Sidebar from './layouts/Sidebar';
import Navbar from './layouts/Navbar';
import Router from './Router.js';
import { AppProvider } from './AppContext';
import LoadControl from './components/LoadControl';


const App = () => {
    return (
    <BrowserRouter >
        <AppProvider>
            <LoadControl>   
                <Sidebar />
                <div id="page-content-wrapper">
                    <Navbar />
                    <Router />
                </div>
            </LoadControl>
        </AppProvider>
    </BrowserRouter>
    );
}

export default App;