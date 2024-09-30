// src/pages/SellPage.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import config from '../config'; // Import the base URL

const SellPage = () => {

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError(error.message); // Capture any errors
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
  const [responseMessage, setResponseMessage] = useState('');
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

  // Define car models based on the car make
  const carModels = {
    Audi: ['A3', 'A4', 'Q5', 'A6', 'A8'],
    BMW: ['X1', 'X3', 'X5', '3 Series', '5 Series'],
    Chevrolet: ['Spark', 'Malibu', 'Camaro', 'Silverado', 'Corvette'],
    Dacia: ['Logan', 'Duster', 'Sandero', 'Dokker', 'Lodgy'],
    Fiat: ['500', 'Panda', 'Tipo', 'Ducato', '500X'],
    Ford: ['Fiesta', 'Focus', 'Mustang', 'EcoSport', 'Explorer'],
    Honda: ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot'],
    Hyundai: ['i10', 'i20', 'Kona', 'Tucson', 'Santa Fe'],
    Kia: ['Rio', 'Seltos', 'Sportage', 'Sorento', 'Optima'],
    Mercedes: ['C-Class', 'E-Class', 'GLA', 'GLE', 'S-Class'],
    MINI: ['Cooper', 'Countryman', 'Clubman', 'Paceman', 'Roadster'],
    Mitsubishi: ['Mirage', 'Outlander', 'Pajero', 'Lancer', 'Eclipse Cross'],
    Nissan: ['Micra', 'Qashqai', 'Juke', 'X-Trail', 'Leaf'],
    Peugeot: ['208', '3008', '308', '2008', '5008'],
    Porsche: ['Cayenne', 'Macan', 'Panamera', '911', 'Taycan'],
    SEAT: ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco'],
    Skoda: ['Fabia', 'Octavia', 'Superb', 'Kodiaq', 'Kamiq'],
    Suzuki: ['Swift', 'Vitara', 'Baleno', 'Ignis', 'Celerio'],
    Tesla: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Roadster'],
    Toyota: ['Corolla', 'Camry', 'Yaris', 'Prius', 'RAV4'],
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
    for (let year = 1980; year <= currentYear; year++) {
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
        <section id="home" class="welcome-hero">
          <div class="top-area">
            <div class="header-area">
                <nav class="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">
                  <Header />
                </nav>
            </div>
          </div>
        </section>
        

        {/* Content Section Start*/}
        <section id="new-cars" class="new-cars">

          {/* Toggle Button */}
          <div class="container">
            <div class="section-header">
              <h2>Sell Cars</h2>
            </div>
            <div class="clearfix"></div>

            <div class="row col-md-8">
              <a href='#' onClick={toggleSections}>
                {showSectionA ? 'Add Car Details(Sell)' : 'Filter Car Details(Sell)'}
              </a>
            </div>
            <div class="clearfix"></div>
            {/* Filter Section Start*/}
            {showSectionA && (
            <div class="row">
              <div class="col-md-10">
                <h1>Car Search (Sell)</h1>
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
                      
                      {/* Search Button */}
                      <div className="form-item" onClick={fetchCarData}>
                        <button type="submit">Search</button>
                      </div>

                      <div className="form-item" onClick={handleAddNew}>
                        <button type="submit">Add Car</button>
                      </div>
                    </form>
                  </div>

                  {/* Search Results */}
                  <div>
                    <h2>Search Results</h2>
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
            </div>
            )}
            {/* Add Car Sell Details Start*/}
            {!showSectionA && (
            <div class="row">
              <div class="col-md-10">
                <div className="search-container">
                  <form className="search-form" onSubmit={handleSubmit}>
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
                      <div className="form-item">
                          <label>Price:</label>
                          <input type="number" name="openPrice" value={carDetails.openPrice} onChange={handleInputChange} required/>
                      </div>
                      <div className="form-item">
                          <label>Description:</label>
                          <textarea rows="4" name="description" value={carDetails.description} onChange={handleInputChange} required/>
                      </div>
                      <div className="form-item" onClick={handleSubmit}>
                        <button type="submit">Submit</button>
                      </div>
                      <div className="form-item">
                        <button type="reset">Reset</button>
                      </div>
                      {responseMessage && <p>Response: {responseMessage}</p>}
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
