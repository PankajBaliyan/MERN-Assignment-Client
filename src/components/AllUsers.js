import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AllUsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [updateData, setUpdateData] = useState({
        name: '',
        username: '',
        password: '',
    });
    // Add a state to hold the userId
    const [userId, setUserId] = useState('');
    // Add a state to control the visibility of the password field
    const [showPassword, setShowPassword] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    let userNumber = 0;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        // Fetch all users from the backend API using Axios
        axios
            .get('http://localhost:3001/users')
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Failed to fetch users:', error);
                setError('Failed to fetch users. Please try again later.');
                setLoading(false);
            });
    };

    const handleUpdateUser = (user) => {
        setUserId(user._id);
        // Open the update modal and set the initial update data
        setUpdateData({
            name: user.name,
            username: user.username,
            password: '',
        });
        setUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        // Close the update modal
        setUpdateModalOpen(false);
    };

    const handleUpdateDataChange = (event) => {
        // Update the updateData state when input fields change
        const { name, value } = event.target;
        setUpdateData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateSubmit = (event) => {
        event.preventDefault();

        // Make an HTTP PUT request to update the user details
        axios
            .patch(
                `http://localhost:3001/updateUserDetails/${userId}`,
                updateData,
            )
            .then((response) => {
                console.log('User data updated successfully:', response.data);
                // Handle success, show a success message, or take appropriate action
                // For example, you can fetch the updated user list from the server again
                fetchUsers();
            })
            .catch((error) => {
                console.error('Failed to update user data:', error);
                // Handle error, show an error message, or take appropriate action
            })
            .finally(() => {
                handleCloseUpdateModal();
            });
    };

    const handleDeleteUser = (userId) => {
        // Make an HTTP DELETE request to delete the user with the given userId
        axios
            .delete(`http://localhost:3001/deleteUser/${userId}`)
            .then((response) => {
                console.log('User deleted successfully');
                // Handle success, redirect, or show a success message
                // For example, you can fetch the updated user list from the server again
                fetchUsers();
            })
            .catch((error) => {
                console.error('Failed to delete user:', error);
                // Handle error, show an error message, or take appropriate action
            });
    };

    const handleTogglePasswordVisibility = () => {
        // Toggle the visibility of the password field
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSearchChange = (event) => {
        // Update the search query state when the search input changes
        setSearchQuery(event.target.value);
    };

    const filteredUsers = users.filter((user) => {
        // Filter users based on search query (case-insensitive)
        const searchValue = searchQuery.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchValue) ||
            user.username.toLowerCase().includes(searchValue)
        );
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h2>All Users List</h2>
                    <button onClick={fetchUsers} className="btn btn-success">
                        Refresh Table Data
                    </button>

                    <div className="row mt-3">
                        {/* Search input */}
                        <div className=" form-group col-md-3 d-flex m-auto">
                            <input
                                type="text"
                                className="form-control border border-1 border-black"
                                placeholder="Search by name or username..."
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>

                {filteredUsers.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id}>
                                    <th scope="row">{(userNumber += 1)}</th>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        <button
                                            className="btn btn-success me-2"
                                            onClick={() =>
                                                handleUpdateUser(user)
                                            }
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                handleDeleteUser(user._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Update Modal */}
                <Modal
                    isOpen={isUpdateModalOpen}
                    onRequestClose={handleCloseUpdateModal}
                >
                    <h2>Update User</h2>
                    <form
                        className="was-validated"
                        onSubmit={handleUpdateSubmit}
                    >
                        <div>
                            <label htmlFor="name" className="form-label">
                                Name:
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                value={updateData.name}
                                onChange={handleUpdateDataChange}
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
                                value={updateData.username}
                                onChange={handleUpdateDataChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password:
                            </label>
                            <input
                                className="form-control"
                                type={showPassword ? 'text' : 'password'} // Show or hide password based on the state
                                id="password"
                                name="password"
                                value={updateData.password}
                                onChange={handleUpdateDataChange}
                                required
                            />

                            <button
                                className="btn btn-outline-secondary mt-3"
                                type="button"
                                onClick={handleTogglePasswordVisibility}
                            >
                                Show Password
                                {showPassword ? (
                                    <FontAwesomeIcon
                                        className="mx-2"
                                        icon={faEyeSlash}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        className="mx-2"
                                        icon={faEye}
                                    />
                                )}{' '}
                                {/* Show the eye icon */}
                            </button>
                        </div>
                        <button type="submit" className="btn btn-success me-2">
                            Update User
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={handleCloseUpdateModal}
                        >
                            Cancel
                        </button>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default AllUsersList;
