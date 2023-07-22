import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import './index.css';
import App from './App';

// Identify the root node of your React application
const rootElement = document.getElementById('root');

// Set the App element for the Modal outside the root render function
Modal.setAppElement(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
