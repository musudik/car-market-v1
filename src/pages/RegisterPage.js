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
    <main>
      <section>
        <div class="user-container">
          
            <h2>User Registration</h2>

            <form onSubmit={handleRegister}>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required/>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required/>
                    <div class="helper-text">Password must be at least 8 characters long.</div>
                </div>

                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" required/>
                </div>

                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" required/>
                </div>

                <div class="form-group">
                    <label for="mobile">Mobile</label>
                    <input type="tel" id="mobile" name="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter your mobile number" required/>
                </div>

                <div class="form-group">
                    <input type="submit" value="Register"/>
                </div>

                <Link to="/login">Login</Link>
            </form>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
