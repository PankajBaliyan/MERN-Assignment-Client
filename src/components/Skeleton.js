import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

const Skeleton = () => {
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowSkeleton((prevShowSkeleton) => !prevShowSkeleton);
        }, 500); // Adjust the blinking speed as needed (500ms in this case)

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="">
            <div>
                <div style={{ textAlign: 'center' }} className="mb-5">
                    <h2>All Users List</h2>
                    <button className="btn btn-success">
                        Refresh Table Data
                    </button>

                    <div className="mt-3">
                        {/* Search input */}
                        <div className=" form-group col-md-3 d-flex m-auto">
                            <input
                                type="text"
                                className="form-control border border-1 border-black"
                                placeholder="Search by name or username..."
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </div>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">
                                Name <FontAwesomeIcon icon={faSort} />
                            </th>
                            <th scope="col">
                                Username <FontAwesomeIcon icon={faSort} />
                            </th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ opacity: showSkeleton ? 1 : 0 }}>
                        <tr>
                            <td className="skeleton-line"></td>
                            <td className="skeleton-line"></td>
                            <td className="skeleton-line"></td>
                            <td style={{ width: '37%' }}>
                                <button
                                    className="btn btn-success me-2"
                                    disabled
                                >
                                    Update
                                </button>
                                <button className="btn btn-danger" disabled>
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="skeleton-line"></td>
                            <td className="skeleton-line"></td>
                            <td className="skeleton-line"></td>
                            <td style={{ width: '37%' }}>
                                <button
                                    className="btn btn-success me-2"
                                    disabled
                                >
                                    Update
                                </button>
                                <button className="btn btn-danger" disabled>
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="skeleton-line"></td>
                            <td className="skeleton-line"></td>
                            <td className="skeleton-line"></td>
                            <td style={{ width: '37%' }}>
                                <button
                                    className="btn btn-success me-2"
                                    disabled
                                >
                                    Update
                                </button>
                                <button className="btn btn-danger" disabled>
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="skeleton-line"></td>
                            <td className="skeleton-line"></td>
                            <td className="skeleton-line"></td>
                            <td style={{ width: '37%' }}>
                                <button
                                    className="btn btn-success me-2"
                                    disabled
                                >
                                    Update
                                </button>
                                <button className="btn btn-danger" disabled>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Render pagination controls */}
                <div className="d-flex justify-content-center">
                    <nav>
                        <ul className="pagination">
                            <li className="active">
                                <button className="page-link">1</button>
                            </li>
                            <li className="">
                                <button className="page-link">2</button>
                            </li>
                            <li className="">
                                <button className="page-link">3</button>
                            </li>
                            <li className="">
                                <button className="page-link">4</button>
                            </li>
                            <li className="">
                                <button className="page-link">5</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
