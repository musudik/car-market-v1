import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarList from '../components/CarList';
import config from '../config'; // Import the base URL

const HomePage = () => {
  const [cars, setCars] = useState([]);         // State to hold car data
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [error, setError] = useState(null);      // State to handle any errors
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/cars`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+token,
          },
          //credentials: 'include', // Allows cookies and other credentials to be sent with the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }

        const data = await response.json();
        setCars(data);    // Store the fetched car data in state
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        setError(error.message); // Capture any errors
        setLoading(false);        // Stop loading on error
      }
    };

    fetchCars(); // Call the function when the component mounts
  }, []);

  return (
    <body>
      <main>
        <section id="home" class="welcome-hero">
          <div class="top-area">
            <div class="header-area">
              <nav class="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">
                <Header />
              </nav>
            </div>
            <div class="clearfix"></div>
          </div>

          <div class="container">
            <div class="welcome-hero-txt">
              <h2>Buy, Sell and Rent your desired cars.</h2>
              <p>
                The perfect market place for all your car needs.
              </p>
            </div>
          </div>
        </section>

        <section id="featured-cars" class="featured-cars">
          <div class="container">
            <div class="section-header">
              <h2>featured cars</h2>
            </div>

            <section id="error-loading">
              {/* Handle Loading State */}
              {loading && <p>Loading cars...</p>}
              {/* Handle Error State */}
              {error && <p>Error fetching cars: {error}</p>}
            </section>

            <div class="featured-cars-content">
              {/* Display car list and handle car selection */}
              <CarList cars={cars} />
            </div>
            <div class="clearfix"></div>
            <div class="featured-cars-content">
              {/* Display selected car details */}
              {/* <CarDetail selectedCar={selectedCar} /> */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </body>
  );
};

export default HomePage;
