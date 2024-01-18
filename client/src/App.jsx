import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contextApi/AuthContext'; // Import the AuthProvider
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/dashboard';
import Logout from './components/Logout';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AuthProvider> {/* Wrap your components with AuthProvider */}
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<NavBar />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/:userId" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
