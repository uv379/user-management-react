import React, { createContext, useState } from 'react';
import { users as initialUsers } from '../data/users';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState(initialUsers);
    const updateUser = (userID, newFirstName, newLastName) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.userID === userID
                    ? { ...user, firstName: newFirstName, lastName: newLastName }
                    : user
            )
        );
    };
    const addUser = (user) => {
        setUsers(prevUsers => [user, ...prevUsers]);
    };
    const deleteUser = (userID) => {
        setUsers(users.map((user) =>
            user.userID === userID ? { ...user, status: 'INACTIVE' } : user
        ))
    }
    return (
        <UserContext.Provider value={{ users, updateUser, addUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};
