import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';


// Styles 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite.min.css'; 
import './style/App.scss';
import './style/Layout.scss';
import './style/Home.scss';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <App />
</React.StrictMode>
);
