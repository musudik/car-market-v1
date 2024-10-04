// src/pages/SellPage.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import config from '../config'; // Import the base URL
import { carModels, fuelType } from '../components/data.js';

const SellPage = () => {

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null); // State to control notification
  const [responseMessage, setResponseMessage] = useState('');

  // Function to trigger notification
  const showNotification = () => {
    setNotification({
      message: responseMessage,
      duration: 3000, // 3 seconds
    });
  };

  // Function to close notification
  const closeNotification = () => {
    setNotification(null); // Hide notification
  };

  // State to store filters
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    gearType: '',
    fuelType: '',
    price: '',
    kilometers: ''
  });
  // State to store search results
  const [searchResults, setSearchResults] = useState([]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Fetch car data from the backend based on filters
  const fetchCarData = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/sell/getAllSellingCarsByUser/${user.id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+token,
        },
      });

      const data = await response.json();
      console.log("fetchCarData:"+data);

      if (!response.ok) {
        console.log("fetchCarData:"+JSON.stringify(response));
        throw new Error('Failed to fetch cars for the user');
      }
      
      const filteredCars = data.filter((car) => {
        return (
          (filters.make === '' || car.make.toLowerCase().includes(filters.make.toLowerCase())) &&
          (filters.model === '' || car.model.toLowerCase().includes(filters.model.toLowerCase())) &&
          (filters.gearType === '' || car.gearType === filters.gearType) &&
          (filters.fuelType === '' || car.fuelType === filters.fuelType)
        );
      });

      setSearchResults(filteredCars);    // Store the fetched car data in state
      setLoading(false); // Stop loading once data is fetched
    } catch (error) {
      console.log("fetchCarData error:"+error);
      setResponseMessage(error.message); // Capture any errors
      setLoading(false);        // Stop loading on error
    }
  };

  // Fetch data when filters are changed
  useEffect(() => {
    fetchCarData(); // Automatically fetch car data on component mount or filter change
  }, [filters]);

  const [cars, setCars] = useState([]);         // State to hold car data
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  
  // Initial state for carDetails
  const initialCarDetails = {
    make: '',
    model: '',
    year: '',
    color: '',
    fuelType: '',
    power: '',
    kilometresDriven: '',
    gearType: '',
    openPrice: '',
    description: '',
    firstRegisteredDate: '',
    status: 'SELL',
    user: {
      id: user.id,
    },
    carSellImages: images,
    carSellDocuments: documents,
  };

  // State to manage carDetails
  const [carDetails, setCarDetails] = useState(initialCarDetails);
  // Function to reset carDetails to the initial state
  const handleAddNew = () => {
    resetAddForm();
    setResponseMessage('');
    toggleSections();
  };

  const resetAddForm = () => {
    setCarDetails(initialCarDetails); // Reset form data to the initial state
    setImages([]);
    setDocuments([]);
  }

  // Handle file change for images
  const handleImageChange = (e) => {
    const images = Array.from(e.target.files); // Convert image list to an array
    const jpgFiles = images.filter((image, index) => {
      const fileDeails = {
        imageFilename: image.name,
        imagesCount: index,
        imageUploadDate: new Date,
      };
      carDetails.carSellImages = [...carDetails.carSellImages, fileDeails];
    }
    );

    if (jpgFiles.length > 10) {
      alert("You can only upload up to 10 JPG files.");
      return;
    }

    setImages(images);
  };

  // Handle file change for documents
  const handleDocumentChange = (e) => {
    const documents = Array.from(e.target.files); // Convert pdf list to an array
    const pdfFiles = documents.filter((doc, index) =>{
      const fileDeails = {
        documentsFilename: doc.name,
        documentsCount: index,
        documentsUploadDate: new Date,
      };
      carDetails.carSellDocuments = [...carDetails.carSellDocuments, fileDeails];
      }
    );

    if (pdfFiles.length > 5) {
      alert("You can only upload up to 5 pdf files.");
      return;
    }

    setDocuments(documents);
  };

  // Handle the input change event
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  // Get the models for the selected make
  const selectedModels = carModels[carDetails.make] || [];
  const selectedFilterModels = carModels[filters.make] || [];

  // Function to generate years from 1980 to the current year
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 1990; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  const yearOptions = generateYearOptions();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    carDetails.firstRegisteredDate = new Date();
    try {
      const response = await fetch(`${config.API_BASE_URL}/sell/add`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+token,
        },
        body: JSON.stringify(carDetails), // Car details payload for Sell.
      });

      if (!response.ok) {
        throw new Error('Failed to upload car sell details:: '+JSON.stringify(response));
      } else {
        setResponseMessage('Car sell details saved successfully!');
        resetAddForm();
      }
    } catch (error) {
      console.error('Error saving car sell details:', error);
      setResponseMessage('Error saving car sell details. Please try again.');
    }
  };  

  // State to toggle between the two sections
  const [showSectionA, setShowSectionA] = useState(true);

  // Toggle between sections
  const toggleSections = () => {
    setResponseMessage('');
    setShowSectionA(!showSectionA); // Toggle the boolean value
    if(showSectionA) {
      fetchCarData();
    }
  };

  return (
    <div>
      <main>
        <Header />
        {/* Content Section Start*/}
        <section id="new-cars" class="new-cars">

          {/* Toggle Button */}
          <div class="container">
            <div class="section-header">
              <h2>Sell Cars</h2>
            </div>
          

            <nav class="sub-nav">
              <ul>
                <li>
                  <a href='#' onClick={toggleSections}>
                {showSectionA ? 'Add Car' : 'Search Car'}
                </a>
                </li>
              </ul>
            </nav>
            
            {/* Filter Section Start*/}
            {showSectionA && (
            <div class="row">
              <div className='side-heading'>Search Car</div>
                {/* Filter Form */}
                  <div className="search-container">
                    <form className="search-form" onSubmit={handleSubmit}>
                      {/* Make */}
                      <div className="form-item">
                        <label>Make:</label>
                        <select value={filters.make} name="make" onChange={handleFilterChange}>
                          <option value="">Select Make</option>
                          {Object.keys(carModels).map((make) => (
                            <option key={make} value={make}>
                              {make}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Model */}
                      <div className="form-item">
                        <label>Model:</label>
                        <select value={filters.model} name="model" onChange={handleFilterChange} disabled={!filters.make}>
                          <option value="">Select Model</option>
                            {selectedFilterModels.map((model) => (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Gear Type */}
                      <div className="form-item">
                        <label>Gear Type:</label>
                        <select value={filters.gearType} name="gearType" onChange={handleFilterChange}>
                          <option value="">Select Gear Type</option>
                          <option value="Manual">Manual</option>
                          <option value="Automatic">Automatic</option>
                        </select>
                      </div>

                      {/* Fuel Type */}
                      <div className="form-item">
                        <label>Fuel Type:</label>
                        <select value={filters.fuelType} name="fuelType" onChange={handleFilterChange}>
                          <option value="">Select Fuel</option>
                          <option value="Petrol">Petrol</option>
                          <option value="Diesel">Diesel</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Electric">Electric</option>
                        </select>
                      </div>

                      {/* Price */}
                      <div className="form-item">
                        <label>Price (Max):</label>
                        <input
                          type="number"
                          name="openPrice"
                          value={filters.openPrice}
                          onChange={handleFilterChange}
                          placeholder="Enter max price"
                        />
                      </div>

                      {/* Kilometers */}
                      <div className="form-item">
                        <label>Kilometers (Max):</label>
                        <input
                          type="number"
                          name="kilometers"
                          value={filters.kilometers}
                          onChange={handleFilterChange}
                          placeholder="Enter max kilometers"
                        />
                      </div>
                      <div className="form-item">
                        <button className='button-search' type="submit" onClick={fetchCarData}>Search</button>
                      </div>
                    </form>
                    {/* Search Button */}
                  </div>

                  {/* Search Results */}
                  <div>
                    <div className='side-heading'>Search Results</div>
                    {searchResults.length === 0 ? (
                      <p>No results found.</p>
                    ) : (
                      <div className="search-results">
                        {/* Header Row */}
                        <div className="header-row">
                          <div className="header-cell">Make</div>
                          <div className="header-cell">Model</div>
                          <div className="header-cell">Gear Type</div>
                          <div className="header-cell">Fuel Type</div>
                          <div className="header-cell">Price</div>
                          <div className="header-cell">Kilometers</div>
                        </div>

                        {/* Data Rows */}
                        {searchResults.map((car, index) => (
                          <div className="data-row" key={car.carSellId}>
                            <div className="data-cell">{car.make}</div>
                            <div className="data-cell">{car.model}</div>
                            <div className="data-cell">{car.gearType}</div>
                            <div className="data-cell">{car.fuelType}</div>
                            <div className="data-cell">${car.openPrice}</div>
                            <div className="data-cell">{car.kilometresDriven}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
            </div>
            )}
            {/* Add Car Sell Details Start*/}
            {!showSectionA && (
            <div class="row">
              <div>
                <div className="search-container">
                  <form  onSubmit={handleSubmit}>
                    <div className="search-form">
                      <div className="form-item">
                          <label>Make:</label>
                          <select value={carDetails.make} name="make" onChange={handleInputChange} required>
                            <option value="">Select Make</option>
                            {Object.keys(carModels).map((make) => (
                              <option key={make} value={make}>
                                {make}
                              </option>
                            ))}
                          </select>
                      </div>
                      <div className="form-item">
                          <label>Model:</label>
                          <select value={carDetails.model} name="model" onChange={handleInputChange} required disabled={!carDetails.make}>
                            <option value="">Select Model</option>
                              {selectedModels.map((model) => (
                              <option key={model} value={model}>
                                {model}
                              </option>
                            ))}
                          </select>
                      </div>
                      <div className="form-item">
                          <label>Fuel:</label>
                          <select value={carDetails.fuelType} name="fuelType" onChange={handleInputChange} required>
                            <option value="">Select Fuel</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Electric">Electric</option>
                          </select>
                      </div>
                      <div className="form-item">
                          <label>Registered Year:</label>
                          <select value={carDetails.year} name="year" onChange={handleInputChange} required>
                            <option value="">Select Year</option>
                            {yearOptions.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                      </div>
                      <div className="form-item">
                          <label>Kilometers:</label>
                          <select value={carDetails.kilometresDriven} name="kilometresDriven" onChange={handleInputChange} required>
                            <option value="">Select KMs</option>
                            <option value="0 Km - 10,000 Km">0 Km - 10,000 Km</option>
                            <option value="10,000 Km - 20,000 Km">10,000 Km - 20,000 Km</option>
                            <option value="20,000 Km - 30,000 Km">20,000 Km - 30,000 Km</option>
                            <option value="30,000 Km - 40,000 Km">30,000 Km - 40,000 Km</option>
                            <option value="40,000 Km - 50,000 Km">40,000 Km - 50,000 Km</option>
                            <option value="50,000 Km - 60,000 Km">50,000 Km - 60,000 Km</option>
                            <option value="60,000 Km - 70,000 Km">60,000 Km - 70,000 Km</option>
                            <option value="70,000 Km - 80,000 Km">70,000 Km - 80,000 Km</option>
                            <option value="80,000 Km - 90,000 Km">80,000 Km - 90,000 Km</option>
                            <option value="90,000 Km - 1,00,000 Km">90,000 Km - 1,00,000 Km</option>
                          </select>
                      </div>
                      <div className="form-item">
                          <label>Gear Type:</label>
                          <select value={carDetails.gearType} name="gearType" onChange={handleInputChange} required>
                            <option value="">Select Gear Type</option>
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                          </select>
                      </div>
                      <div className="form-item">
                          <label>Price:</label>
                          <input type="number" name="openPrice" value={carDetails.openPrice} onChange={handleInputChange} required/>
                      </div>
                      <div className="form-item">
                          <label>Description:</label>
                          <textarea rows="2" name="description" value={carDetails.description} onChange={handleInputChange} required/>
                      </div>
                    </div>
                    <div className="search-form-2">
                      <div className="form-item">
                          <label>Car Images (up to 10 JPG files):</label>
                          <input type="file" id="carImages" name="carImages" accept=".jpg,.jpeg" multiple onChange={handleImageChange}/>
                          {/* Display Selected Images */}
                          {images.length > 0 && (
                            <div>
                              <h4>Selected Images:</h4>
                              <ul>
                                {images.map((file, index) => (
                                  <li key={index}>
                                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                      <div className="form-item">
                          <label>Car Documents (up to 5 PDF files):</label>
                          <input type="file" id="carDocuments" name="carDocuments" accept=".pdf" multiple onChange={handleDocumentChange}/>
                          {/* Display Selected Images */}
                          {documents.length > 0 && (
                            <div>
                              <h4>Selected Documents:</h4>
                              <ul>
                                {documents.map((file, index) => (
                                  <li key={index}>
                                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                      <div className="form-item" onClick={handleSubmit}>
                        <button type="submit">Add Car</button>
                      </div>
                    </div>  

                    {/* Show notification if it exists */}
                    {notification && (
                      <Notification
                        message={notification.message}
                        duration={notification.duration}
                        onClose={closeNotification}
                      />
                    )}
                    {responseMessage && <p> {responseMessage}</p>}
                  </form>
                </div>
              </div>
            </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SellPage;
