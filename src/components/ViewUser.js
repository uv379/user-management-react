import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const ViewUser = () => {
    const { users } = useContext(UserContext);
    const { userID } = useParams();
    const navigate = useNavigate();
    const user = users.find((user) => user.userID === userID);

    if (!user) return <p>User not found!</p>;

    return (
        <div className="view-user-container">
            <h1>User Details</h1>
            <p><strong>UserID:</strong> {user.userID}</p>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Status:</strong> {user.status}</p>
            <button onClick={() => navigate('/')}>Back</button>
        </div>
    );
};

export default ViewUser;
