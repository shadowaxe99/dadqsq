import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../services/authService';
import './styles/main.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authService.loginUser(email, password);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        history.push('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="login-page">
      <form id="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;