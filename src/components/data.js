  // Define car models based on the car make
  export const carModels = {
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

  // Function to generate years from 1980 to the current year
  export const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 1990; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  // Types of Car Fuels
  // export const fuelType = [
  //   Petrol,
  //   Diesel,
  //   Hybrid,
  //   Electric,
  // ];

  // // Types of Car Gears
  // export const gearType = [
  //   Manual,
  //   Automatic,
  // ];

  export const kilometresDriven = {
    "0 Km - 10,000 Km": "0 Km - 10,000 Km",
    "10,000 Km - 20,000 Km":"10,000 Km - 20,000 Km",
    "20,000 Km - 30,000 Km":"20,000 Km - 30,000 Km",
    "30,000 Km - 40,000 Km":"30,000 Km - 40,000 Km",
    "40,000 Km - 50,000 Km":"40,000 Km - 50,000 Km",
    "50,000 Km - 60,000 Km":"50,000 Km - 60,000 Km",
    "60,000 Km - 70,000 Km":"60,000 Km - 70,000 Km",
    "70,000 Km - 80,000 Km":"70,000 Km - 80,000 Km",
    "80,000 Km - 90,000 Km":"80,000 Km - 90,000 Km",
    "90,000 Km - 1,00,000 Km":"90,000 Km - 1,00,000 Km",
  };

  // State to store filters
  export const initFilters = {
    make: '',
    model: '',
    gearType: '',
    fuelType: '',
    price: '',
    kilometers: ''
  };

  // Initial state for carDetails
  export const initialCarDetails = {
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
    status: '',
    user: null,
    carSellImages: [],
    carSellDocuments: [],
  };
