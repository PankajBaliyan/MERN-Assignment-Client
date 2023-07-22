import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    UserAuth
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link active`}
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                    </ul>
                    <Link to="/" className="btn btn-success mx-2">
                        Add User
                    </Link>
                    <Link to="/users" className="btn btn-primary mx-2">
                        View users
                    </Link>
                </div>
            </div>
        </nav>
    );
}
