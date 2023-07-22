import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faEyeSlash,
    faSortUp,
    faSortDown,
    faSort,
} from '@fortawesome/free-solid-svg-icons';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const AllUsersList = (props) => {
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

    // Used to search functionality
    const [searchQuery, setSearchQuery] = useState('');

    // Used to sort functionality
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

    // Used in pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5); // Number of users displayed per page

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleNotify = (message) => {
        props.notify(message);
    };

    const fetchUsers = () => {
        // Fetch all users from the backend API using Axios
        axios
            .get(`${SERVER_URL}/users`)
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Failed to fetch users:', error);
                setError(
                    "Failed to fetch users. Please try again later OR No User's Available",
                );
                handleNotify(
                    "Failed to fetch users. Please try again later OR No User's Available. ❌ ",
                );
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
            .patch(`${SERVER_URL}/updateUserDetails/${userId}`, updateData)
            .then((response) => {
                handleNotify('User data updated Successfully ✅');
                fetchUsers();
            })
            .catch((error) => {
                handleNotify('User data updated Failed ❌ ');
            })
            .finally(() => {
                handleCloseUpdateModal();
            });
    };

    const handleDeleteUser = (userId) => {
        // Make an HTTP DELETE request to delete the user with the given userId
        axios
            .delete(`${SERVER_URL}/deleteUser/${userId}`)
            .then((response) => {
                fetchUsers();
                handleNotify('User Deleted Successfully ✅');
            })
            .catch((error) => {
                handleNotify('User Deleted Failed ❌');
            });
    };

    const handleTogglePasswordVisibility = () => {
        // Toggle the visibility of the password field
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Function to handle sorting when a table header is clicked
    const handleSort = (field) => {
        // If the clicked field is the current sort field, toggle the sort order
        if (field === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // If the clicked field is a different field, set it as the new sort field and default to ascending order
            setSortField(field);
            setSortOrder('asc');
        }
        // Show a notification message when sorting changes
        handleNotify(
            `Sorted by ${field} in ${
                sortOrder === 'asc' ? 'descending' : 'ascending'
            } order ✅`,
        );
    };

    // Function to handle filtering when the search query changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to filter users based on the search query
    const filteredUsers = users.filter((user) => {
        const searchValue = searchQuery.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchValue) ||
            user.username.toLowerCase().includes(searchValue)
        );
    });

    // Function to sort the filtered users based on the current sort field and order
    const sortedAndFilteredUsers = filteredUsers.sort((a, b) => {
        if (sortField === 'id') {
            return sortOrder === 'asc' ? a._id - b._id : b._id - a._id;
        } else {
            const aValue = a[sortField].toLowerCase();
            const bValue = b[sortField].toLowerCase();
            return sortOrder === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
    });
    // Calculate the total number of pages
    const totalPages = Math.ceil(sortedAndFilteredUsers.length / usersPerPage);

    // Function to get the current users to display on the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedAndFilteredUsers.slice(
        indexOfFirstUser,
        indexOfLastUser,
    );

    // Function to handle pagination page changes
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div className="mt-3 text-center" style={{ color: 'red' }}>
                {error}
            </div>
        );
    }

    return (
        <div>
            <div>
                <div style={{ textAlign: 'center' }} className="mb-5">
                    <h2>All Users List</h2>
                    <button
                        onClick={() => {
                            fetchUsers();
                            handleNotify('Data refreshed ✅');
                        }}
                        className="btn btn-success"
                    >
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
                                <th
                                    scope="col"
                                    onClick={() => handleSort('name')}
                                >
                                    Name{' '}
                                    {sortField === 'name' && (
                                        <FontAwesomeIcon
                                            icon={
                                                sortOrder === 'asc'
                                                    ? faSortUp
                                                    : faSortDown
                                            }
                                        />
                                    )}
                                    {sortField === 'username' && (
                                        <FontAwesomeIcon icon={faSort} />
                                    )}
                                </th>
                                <th
                                    scope="col"
                                    onClick={() => handleSort('username')}
                                >
                                    Username{' '}
                                    {sortField === 'username' && (
                                        <FontAwesomeIcon
                                            icon={
                                                sortOrder === 'asc'
                                                    ? faSortUp
                                                    : faSortDown
                                            }
                                        />
                                    )}
                                    {sortField === 'name' && (
                                        <FontAwesomeIcon icon={faSort} />
                                    )}
                                </th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{indexOfFirstUser + index + 1}</td>{' '}
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

                {/* Render pagination controls */}
                <div>
                    <nav>
                        <ul className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${
                                        currentPage === index + 1
                                            ? 'active'
                                            : ''
                                    }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            handlePageChange(index + 1)
                                        }
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

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
