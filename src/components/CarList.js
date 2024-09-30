import React from 'react';
import { useNavigate } from 'react-router-dom';

const imagePath = '../assets/images/featured-cars';
const CarList = ({ cars }) => {

  const navigate = useNavigate();

  const onCarSelect = (car) => {
    // Navigate to CarDetails page with the selected car's id
    navigate(`/car-details/${car.id}`);
  };

  return (
    <div class="featured-cars-content">
      <div class="row">
      { cars.map(car => (
        <div key={car.id} class="col-lg-3 col-md-4 col-sm-6" onClick={() => onCarSelect(car)}>
        <div class="single-featured-cars">
          <div class="featured-img-box">
            <div class="featured-cars-img" >
              <img  src={`${process.env.PUBLIC_URL}/${car.image}`} alt={car.image} />
            </div>
            <div class="featured-model-info">
              <p>
                model: {car.year}
                <span class="featured-mi-span"> {car.mileage}mi</span> 
                <span class="featured-hp-span"> {car.power}HP</span>
                {car.gearType}
              </p>
            </div>
          </div>
          <div class="featured-cars-txt">
            <h3>{car.make} {car.model}</h3>
          </div>
        </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default CarList;
