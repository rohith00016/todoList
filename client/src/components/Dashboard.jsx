import React from 'react';
import { NavLink } from 'react-router-dom';
import ToDoList from './ToDoList';
import Logout from './Logout';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h3>ToDoList:</h3>
      <ToDoList />

      <div className="logout-link">
        <NavLink to="/logout" className="logout-button">
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Dashboard;
