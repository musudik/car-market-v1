import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import config from '../config'; // Import the base URL

const imagePath = '../assets/images/featured-cars';
const CarDetails = () => {
  const { id } = useParams(); // Extract the car ID from the URL
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [error, setError] = useState(null);      // State to handle any errors
  const token = localStorage.getItem('token');

  /** fetch car details based on the selected car */
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/cars/${id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+token,
          },
        });

        const data = await response.json();
        setLoading(false); // Stop loading once data is fetched
        setCar(data);
      } catch (error) {
        console.error('Error fetching car details:', error);
        setError(error.message); // Capture any errors
        setLoading(false);        // Stop loading on error
      }
    };

    fetchCarDetails();
  }, [id]);

  const [isEditMode, setIsEditMode] = useState(false); // Track if it's edit mode or view mode
  const [editedCar, setEditedCar] = useState({ ...car }); // Clone the car details to edit
  const [selectedCar, setSelectedCar] = useState(null);

  // Toggle between view and edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setEditedCar(car);
  };

  // Handle input changes when editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === 'image') {
      let imageName = '';
      var tokens = value.split('\\');//split path
      var filename = tokens[tokens.length-1];//take file name
      imageName = imagePath +"/"+ filename;
      alert(filename);
      setEditedCar((prevCar) => ({ ...prevCar, [name]: imageName }));
    } else {
      setEditedCar((prevCar) => ({ ...prevCar, [name]: value }));
    }
  };

  // Handle form submission
  const handleSave = () => {
    onSave(editedCar); // Save the updated car details (assume onSave is passed from parent)
    setIsEditMode(false); // Switch back to view mode after saving
  };

  // onSave function to handle saving edited car details
  const onSave = async (editedCar) => {
    try {
      console.log(JSON.stringify(editedCar));
      const response = await fetch(`${config.API_BASE_URL}/cars`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedCar), // Send the updated car data
      });

      if (!response.ok) {
        throw new Error('Failed to update car');
      }

      // Update the car list with the updated car details
      const updatedCar = await response.json();
      setCar(updatedCar);
      setSelectedCar(updatedCar); // Update the selected car with new data
      //alert('Car details saved successfully');
    } catch (error) {
      console.error('Error saving car:', error);
      //alert('Error saving car');
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div>
      <main>
        <section id="home" class="welcome-hero">
          <div class="top-area">
            <div class="header-area">
              <nav class="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">
                <Header />
              </nav>
            </div>
            <div class="container">
            <div class="welcome-hero-txt">
              <h2>Buy, Sell and Rent your desired cars.</h2>
              <p>
                The perfect market place for all your car needs.
              </p>
            </div>
          </div>
            <div class="clearfix"></div>
          </div>
        </section>

        <section id="error-loading">
          {/* Handle Loading State */}
          {loading && <p>Loading cars...</p>}
          {/* Handle Error State */}
          {error && <p>Error fetching cars: {error}</p>}
        </section>
            
          {isEditMode ? (
            // Render input fields in edit mode
            <div>
              <section id="featured-cars" class="featured-cars">
                <div class="container">
                  <div class="featured-cars-content">
                    <div class="single-featured-cars">
                      <div className="featured-cars-txt">

                            <table>
                                <tr>
                                    <th>Car Make</th>
                                    <td><input type="text" name="make" value={editedCar.make} placeholder="e.g., Toyota" required onChange={handleInputChange}/></td>
                                </tr>
                                <tr>
                                    <th>Car Model</th>
                                    <td><input type="text" name="model" value={editedCar.model} placeholder="e.g., Corolla" required onChange={handleInputChange}/></td>
                                </tr>
                                <tr>
                                    <th>Year</th>
                                    <td><input type="number" name="year" value={editedCar.model} placeholder="e.g., 2020" required onChange={handleInputChange}/></td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>
                                        <select value={editedCar.status} name="status" required onChange={handleInputChange}>
                                            <option value="BUY">BUY</option>
                                            <option value="SALE">SALE</option>
                                            <option value="RENT">RENT</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Mileage (mi)</th>
                                    <td><input type="number" name="mileage" value={editedCar.mileage} placeholder="e.g., 15000" required onChange={handleInputChange}/></td>
                                </tr>
                                <tr>
                                    <th>Power (HP)</th>
                                    <td><input type="number" name="power" value={editedCar.power} placeholder="e.g., 200" required onChange={handleInputChange}/></td>
                                </tr>
                                <tr>
                                    <th>Gear Type</th>
                                    <td>
                                        <select value={editedCar.gearType} name="gearType" required onChange={handleInputChange}>
                                            <option value="manual">Manual</option>
                                            <option value="automatic">Automatic</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Price (€)</th>
                                    <td><input type="number" name="price" value={editedCar.price} placeholder="e.g., 20000" required onChange={handleInputChange}/></td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td><textarea name="description" rows="4" value={editedCar.description} placeholder="Add any additional details about the car..." required onChange={handleInputChange}></textarea></td>
                                </tr>
                                <tr>
                                    <th>Car Image</th>
                                    <td>
                                        <input type="file" name="image" filename={editedCar.image} accept="image/*" onChange={handleInputChange}/>
                                        <div class="col-md-7 col-sm-12">
                                          <div class="new-cars-img">
                                            <img src={`${process.env.PUBLIC_URL}/${editedCar.image}`} alt={editedCar.image} />
                                          </div>
                                        </div>    
                                    </td>

                                </tr>
                            </table>
                            {/* Show Save button only in edit mode */}
                            {
                              isEditMode && 
                              <button class="welcome-btn new-cars-btn" onClick={handleSave}>
                                Save
                              </button>
                            }
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            // Render plain text in view mode
            <div>
              <section id="new-cars" class="new-cars">
                <div class="container">
                  <div class="section-header">
                    <h2>{car.make} {car.model}</h2>
                  </div>
                  <div class="new-cars-content">
                      <div class="new-cars-item">
                        <div class="single-new-cars-item">
                          <div class="row">
                            <div class="col-md-7 col-sm-12">
                              <div class="new-cars-img">
                                <img src={`${process.env.PUBLIC_URL}/${car.image}`} alt={car.image} />
                              </div>
                            </div>
                            <div class="col-md-5 col-sm-12">
                              <div class="new-cars-txt">
                                {/* <h2><a href="#">{car.make} <span> {car.model}</span></a></h2> */}
                                <h4>
                                  {car.description}
                                </h4>
                                <p class="new-cars-para2">
                                  <h5>Mileage: {car.mileage} mi</h5>
                                  <h5>Power: {car.power} HP</h5>
                                  <h5>Gear Type: {car.gearType}</h5>
                                  <h5>Price: {car.price}</h5>
                                  <h5>Status: {car.status}</h5>
                                </p>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        {/* Toggle between view and edit mode */}
        <button class="welcome-btn new-cars-btn" onClick={toggleEditMode}>
          {isEditMode ? 'Cancel' : 'Edit'}
        </button>
        
        
      </main>
    </div>
  );
};

export default CarDetails;
