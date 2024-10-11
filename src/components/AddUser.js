
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../data/users';
import { UserContext } from '../context/UserContext';

const AddUser = () => {
    const { addUser } = useContext(UserContext);
    const [userID, setUserID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [status] = useState('ACTIVE');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userID || !firstName || !lastName) {
            alert('All fields are required');
            return;
        }
        const existingUser = users.find((user) => user.userID === userID);
        if (existingUser) {
            alert('UserID must be unique');
            return;
        }
        const newUser = { userID, firstName, lastName, status };
        addUser(newUser);
        setTimeout(() => { 
            navigate('/');
        }, 0);
    };

    return (
        <div className="add-user-container">
            <h1>Add User</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="UserID (email)"
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
};

export default AddUser;
