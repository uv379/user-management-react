
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const UserList = () => {
    const { users } = useContext(UserContext);
    const { deleteUser } = useContext(UserContext);
    const [filter, setFilter] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [userList, setUserList] = useState(users);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    useEffect(() => {
        setUserList(users)
    }, [users])


    const getFilteredUsers = () => {
        let filteredUsers = [...users];

        if (searchTerm) {
            filteredUsers = filteredUsers.filter((user) =>
                user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (filter !== 'ALL') {
            filteredUsers = filteredUsers.filter((user) => user.status === filter);
        }

        return filteredUsers;
    };

    useEffect(() => {
        const filteredUsers = getFilteredUsers();
        setUserList(filteredUsers);
        setCurrentPage(1);
    }, [searchTerm, filter]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userList.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(userList.length / usersPerPage);
    const handleDelete = (userID) => {
        if (window.confirm('Are you sure you want to deactivate this user?')) {
            deleteUser(userID);
        }
    };
    return (
        <div className="user-list-container">
            <div className="user-list-header">
                <h1>User Management</h1>
                <Link to="/add-user" className="btn btn-primary">Add User</Link>
            </div>

            <div className="search-panel">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                />
            </div>

            <div className="filter-tabs">
                <button className={filter === 'ALL' ? 'acctive-button' : ''} onClick={() => setFilter('ALL')}>All</button>
                <button className={filter === 'ACTIVE' ? 'acctive-button' : ''} onClick={() => setFilter('ACTIVE')}>Active</button>
                <button className={filter === 'INACTIVE' ? 'acctive-button' : ''} onClick={() => setFilter('INACTIVE')}>Inactive</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
                            <tr key={user.userID}>
                                <td>{user.userID}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.status}</td>
                                <td>
                                    <Link to={`/view-user/${user.userID}`}>View</Link>
                                    <Link to={`/edit-user/${user.userID}`}>Edit</Link>
                                    <button onClick={() => handleDelete(user.userID)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="pagination-controls">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserList;
