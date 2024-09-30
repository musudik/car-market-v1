import React, { useState } from 'react';

const CarForm = ({ onSubmit }) => {
  const [car, setCar] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    status: ''
  });

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(car);
    setCar({ make: '', model: '', year: '', price: '', status: '' }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label>
        Make:
        <input type="text" name="make" value={car.make} onChange={handleChange} />
      </label>
      <label>
        Model:
        <input type="text" name="model" value={car.model} onChange={handleChange} />
      </label>
      <label>
        Year:
        <input type="number" name="year" value={car.year} onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={car.price} onChange={handleChange} />
      </label>
      <label>
        Status:
        <select name="status" value={car.status} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="for-sale">For Sale</option>
          <option value="for-rent">For Rent</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd'
  }
};

export default CarForm;
