
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import ViewUser from './components/ViewUser';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user/:userID" element={<EditUser />} />
          <Route path="/view-user/:userID" element={<ViewUser />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
