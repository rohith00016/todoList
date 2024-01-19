import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { useAuth } from '../contextApi/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    server: '', // New state for server-side errors
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
      server: '', // Clear server-side errors when the user starts typing
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3000/api/users/login', formData);

        if (response.data && response.data.token && response.data.userId) {
          localStorage.setItem('token', response.data.token);
          login(response.data.userId);
          navigate(`/dashboard/${response.data.userId}`, {
            state: { user: response.data },
          });
        } else {
          console.error('Invalid response from the server:', response.data);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const responseData = error.response.data;

          setErrors({
            ...errors,
            server: responseData.error || 'An error occurred during login',
          });
        } else {
          console.error('Login error:', error);
        }
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              name="username"
              autoComplete="current-username"
              value={formData.username}
              onChange={handleChange}
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            {errors.server && <div className="invalid-feedback">{errors.server}</div>}
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
