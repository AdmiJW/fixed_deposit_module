import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import FdList from './pages/FdList';
import NotFound from './pages/NotFound';
import FdDetails from './pages/FdDetails';
import Delete from './pages/Delete';
import ScheduleList from './pages/ScheduleList';
import AcceptReject from './pages/AcceptReject';
import DepositWithdrawal from './pages/DepositWithdrawal';
import Logout from './pages/Logout';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';


// What URL to redirect to if root url is provided?
const HOME_REDIRECT_URL = '/home';



// List of routes. New routes should be added here
export const RouteList = [
    { name: 'Fixed Deposit', sideBarPath: '/', path: '/', component: <Navigate to={HOME_REDIRECT_URL} /> },

    { name: "Home", sideBarPath: '/home', path: '/home', component: Home, displayInSidebar: true },
    { name: 'My Fixed Deposits', sideBarPath: '/fd', path: '/fd', component: FdList, displayInSidebar: true },
    { name: 'New Fixed Deposit', sideBarPath: '/fd/new' , path: '/fd/new', component: FdDetails, displayInSidebar: true },
    { name: 'View Fixed Deposit', path: '/fd/:id', component: FdDetails, displayInSidebar: false },
    { name: 'View Schedules', path: '/fd/schedules/:id', component: ScheduleList, displayInSidebar: false },
    { name: 'Delete Fixed Deposit', path: '/fd/delete/:id', component: Delete, displayInSidebar: false },
    { name: 'Approve Fixed Deposit', path: '/fd/approve/:id', component: AcceptReject, displayInSidebar: false, props: { mode: 'APPROVE' } },
    { name: 'Reject Fixed Deposit', path: '/fd/reject/:id', component: AcceptReject, displayInSidebar: false, props: { mode: 'REJECT' } },
    { name: 'Additions/Withdrawals', path: '/fd/addition_withdraw/:id', component: DepositWithdrawal, displayInSidebar: false },

    { name: "Log out", path: '/logout', component: Logout, displayInSidebar: false },
    { name: "Log in", path: '/login', component: Login, displayInSidebar: false },
    { name: "Register", path: '/register', component: Registration, displayInSidebar: false },
];



export default function FixedDepositRouter() {
    return (
        <div className="bg-light p-3">
            <Routes>

                {/* Create <Route> based on specific routes that are provided in the RouteList above */}
                {
                    RouteList.map(r => (
                        r.path !== '' && r.path !== '/' ?
                        <Route path={r.path} key={r.path} element={
                            < r.component route={{ name: r.name, path: r.path }} {...r.props} />
                        } /> 
                        : null
                    ))
                }

                {/* Redirection from root url */}
                <Route path="/" element={<Navigate to={HOME_REDIRECT_URL} />} />
                {/* Not Found Page */}
                <Route path="*" element={ <NotFound /> } />
            </Routes>
        </div>
    )
}
