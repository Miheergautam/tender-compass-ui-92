
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../components/LoginPage';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return <LoginPage onLogin={handleLogin} />;
};

export default Login;
