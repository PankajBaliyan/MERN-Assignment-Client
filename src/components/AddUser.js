import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const AddUserForm = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
    });

    // Add a state to control the visibility of the password field
    const [showPassword, setShowPassword] = useState(false);

    const handleNotify = (message) => {
        props.notify(message);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const isPasswordValid = (password) => {
        // Password must be at least 8 characters with letters and numbers
        const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // eslint-disable-next-line no-unused-vars
        const { name, username, password } = formData;

        // Validate the password
        if (!isPasswordValid(password)) {
            handleNotify(
                'Password must be at least 8 characters long and contain both letters and numbers. ❌',
            );
            return;
        }

        // Send the data to the backend API using Axios
        axios
            .post(`${SERVER_URL}/users`, formData)
            .then((response) => {
                // console.log('User added successfully:', response.data);
                handleNotify('User added successfully ✅');
            })
            .catch((error) => {
                // console.error('Failed to add user:', error);
                if (error.response) {
                    const { status } = error.response;

                    if (status === 409) {
                        handleNotify('User Already Exists 🙎‍♂️');
                    } else if (status === 400) {
                        handleNotify(
                            'Missing required fields or Invalid email format 🤔',
                        );
                    } else {
                        console.error('Failed to add user:', error);
                        handleNotify(
                            'An error occurred while adding the user. Please try again later. ❌',
                        );
                    }
                } else {
                    console.error('Failed to add user:', error);
                    handleNotify(
                        'An error occurred while adding the user. Please try again later. ❌',
                    );
                }
            });

        // Reset the form after successful submission
        setFormData({
            name: '',
            username: '',
            password: '',
        });
    };

    const handleTogglePasswordVisibility = () => {
        // Toggle the visibility of the password field
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <form className="was-validated" onSubmit={handleSubmit}>
            <h2>Add User</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name:
                </label>
                <input
                    className="form-control"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="username" className="form-label">
                    Email:
                </label>
                <input
                    className="form-control"
                    type="email"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="form-label">
                    Password:
                </label>
                <input
                    className="form-control"
                    type={showPassword ? 'text' : 'password'} // Show or hide password based on the state
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button
                    className="btn btn-outline-secondary mt-3"
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                >
                    Show Password
                    {showPassword ? (
                        <FontAwesomeIcon className="mx-2" icon={faEyeSlash} />
                    ) : (
                        <FontAwesomeIcon className="mx-2" icon={faEye} />
                    )}{' '}
                </button>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
                Add User
            </button>
        </form>
    );
};

export default AddUserForm;
