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
    <section id="home" class="welcome-hero">
      <div class="top-area">
        <div class="header-area">
          <nav class="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">
            <div class="container">
              <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                  <i class="fa fa-bars"></i>
                </button>

                <a href="/">
                  <div class="logo">
                    <img src="../assets/images/logo.png" alt="Logo" />
                  </div>
                </a>
              </div>
              <div class="collapse navbar-collapse menu-ui-design" id="navbar-menu">
                <ul class="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                  <li class="scroll active"><Link to="/">Home</Link></li>
                  {user ? (<li class="scroll"><Link to="./pages/BuyPage">Buy</Link></li>) : (<li></li>)}
                  {user ? (<li class="scroll"><Link to="/sell">Sell</Link></li>) : (<li></li>)}
                  {user ? (<li class="scroll"><Link to="/rent">Rent</Link></li>) : (<li></li>)}
                  {user ? (
                    <li class="scroll login-logout-text"><a href='#' onClick={handleLogout}><span class="login-logout-text">Logout</span></a></li>
                  ) : (
                    <li class="scroll"><Link to="/login">Login</Link></li>
                  )}
                  {user ? (
                    <li></li>
                  ) : (
                    <li class="scroll"><Link to="/register">Register</Link></li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div class="clearfix"></div>
      </div>

      <div class="container">
        <div class="welcome-hero-txt">
          <br /><br /><br />
          <h2>Buy, Sell and Rent your desired cars.</h2>

          {/* <p>
          The perfect market place for all your car needs.
        </p> */}
        </div>
      </div>
    </section>
  );
};

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
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
