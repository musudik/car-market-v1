import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarList from '../components/CarList';
import CarDetail from '../components/CarDetail';
import apiClient from '../api/apiClient';

const BuyPage = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    // Fetch cars from API
    apiClient.get('/cars')
      .then(response => setCars(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Header />
      <main style={styles.main}>
        <h2>Available Cars for Sale</h2>
        <CarList cars={cars} onCarSelect={setSelectedCar} />
        <CarDetail car={selectedCar} />
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  main: {
    padding: '20px'
  }
};

export default BuyPage;
