import React from 'react';
import { NavLink } from 'react-router-dom';
import ToDoList from './ToDoList';
import Logout from './Logout';

const Dashboard = () => {
  return (
    <div className="container-sm mt-4">
      <h3>ToDoList:</h3>
      <ToDoList />
      <div className="mt-3">
        <NavLink to="/logout" className="btn btn-primary">
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Dashboard;
