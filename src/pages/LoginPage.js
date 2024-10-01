import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config'; // Import the base URL
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Save JWT token
        localStorage.setItem('user', JSON.stringify(data.user)); // Save JWT token
        navigate('/'); // Redirect to home page after login
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError('Error occurred');
    }
  };

  return (
    <div className="registration-page">
    {/* Blurred background image */}
    <div className="background-image"></div>
      <div className="registration-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>

              <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required/>
              </div>

              <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required/>
              </div>
              {error && <p>{error}</p>}
              <div class="form-group">
                  <input type="submit" value="Login"/>
                  Don't have an account ? <Link to="/register">Register</Link>
              </div>
          </form>
        </div>
      </div>
    
  );
};

export default LoginPage;
