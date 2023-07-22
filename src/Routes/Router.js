import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AllUsersList from '../components/AllUsers';
import Home from '../components/home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const AppRouter = () => {
    const notify = (message) => toast(message); // Accepting a message parameter

    return (
        <BrowserRouter>
            <Navbar />
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home notify={notify} />} />
                <Route
                    path="/users"
                    element={<AllUsersList notify={notify} />}
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
