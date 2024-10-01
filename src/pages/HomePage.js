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
        <Header />
        <section id="featured-cars" class="featured-cars">
          <div class="container">
            <div class="section-header">
              <h2>Welcome to The Car Market</h2>
            </div>
            <div className="welcome-page">
              <div className="content-container">
                <p>
                  <strong>The Car Market</strong> is a comprehensive online platform designed to simplify the buying, selling, and renting of cars. Whether you’re a car owner looking to sell your vehicle or a buyer searching for your next ride, The Car Market provides an easy-to-use interface for seamless transactions. 
                </p>
                <p>
                  With powerful filtering options based on make, model, gear type, fuel type, and price range, users can effortlessly browse and find the perfect car that meets their needs. Sellers benefit from detailed listing options, allowing them to upload car details, images, and documents to attract potential buyers. 
                </p>
                <p>
                  Additionally, the platform supports car rentals, catering to those seeking short-term vehicle solutions. Built with a modern, responsive design, The Car Market is equipped with secure user authentication, ensuring safe and reliable transactions for all users. Whether buying, selling, or renting, The Car Market offers a streamlined, user-friendly experience for all.
                </p>
              </div>
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
