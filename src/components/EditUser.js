import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const EditUser = () => {
    const { updateUser } = useContext(UserContext);
    const { users } = useContext(UserContext);
    const { userID } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    useEffect(() => {
        const existingUser = users.find((user) => user.userID === userID);
        if (existingUser) {
            setUser(existingUser);
            setFirstName(existingUser.firstName);
            setLastName(existingUser.lastName);
        }
    }, [userID]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName) {
            alert('All fields are required');
            return;
        }
        updateUser(userID, firstName, lastName);
        setTimeout(() => {
            navigate('/');
        }, 0);
    };

    if (!user) return <p>User not found!</p>;

    return (
        <div className="edit-user-container">
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" value={user.userID} readOnly />
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
                <button type="submit">Update</button>
                <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
};

export default EditUser;
