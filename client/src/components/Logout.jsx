import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextApi/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();

  useEffect(() => {
    logout();
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p> 
    </div>
  );
};

export default Logout;
