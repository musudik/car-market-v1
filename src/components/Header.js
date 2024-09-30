import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

  const [user, setUser] = useState(localStorage.getItem('user'));
  
  useEffect(() => {
    // Fetch user details from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null && storedUser !== undefined) {
      setUser(storedUser);
    }
  }, []);

  return (
      <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                <i class="fa fa-bars"></i>
            </button>
            <a class="navbar-brand" href="/"><Link to="/">THE CAR MARKET</Link><span></span></a>
        </div>
        <div class="collapse navbar-collapse menu-ui-design" id="navbar-menu">
            <ul class="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                <li class="scroll active"><Link to="/">Home</Link></li>
                <li class="scroll"><Link to="./pages/BuyPage">Buy</Link></li>
                <li class="scroll"><Link to="/sell">Sell</Link></li>
                <li class="scroll"><Link to="/rent">Rent</Link></li>
                {user ? (
                  <li class="scroll login-logout-text"><a href='#' onClick={handleLogout}><span class="login-logout-text">Logout</span></a></li>
                ) : (
                  <li class="scroll"><Link to="/login">Login</Link></li>
                )}
            </ul>
        </div>
      </div>
  );
};

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

const styles = {
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'center'
  }
};

export default Header;
