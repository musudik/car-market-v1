import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config'; // Import the base URL

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName, mobile}),
      });

      if (response.ok) {
        alert('Registration successful');
        navigate(`/login`);
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError('Error occurred');
    }
  };

  return (

    <div className="registration-page">
    {/* Blurred background image */}
    <div className="background-image"></div>

    {/* Registration form */}
        <div className="registration-form">
          <h2>Create Your Account</h2>
          <form onSubmit={handleRegister}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} 
              placeholder="Enter your first name"
              required
            />

            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />

            <label>Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)} 
              placeholder="Enter your mobile number"
              required
            />

            {error && <p>{error}</p>}
              <div class="form-group">
                  <input type="submit" value="Register"/>
                  Already registered? <Link to="/login">Login</Link>
              </div>
          </form>
          
        </div>
      </div>
  );
};

export default RegisterPage;
