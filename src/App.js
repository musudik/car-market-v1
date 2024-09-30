import './App.css';
import './assets/css/animate.css';
import './assets/css/bootsnav.css';
import './assets/css/bootstrap.min.css';
import './assets/css/flaticon.css';
import './assets/css/font-awesome.min.css';
import './assets/css/linearicons.css';
import './assets/css/owl.carousel.min.css';
import './assets/css/owl.theme.default.min.css';
import './assets/css/responsive.css';
import './assets/css/style.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BuyPage from './pages/BuyPage';
import SellPage from './pages/SellPage';
import RentPage from './pages/RentPage';
import CarDetail from './components/CarDetail';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
       
        <Routes>
          {/* Public Route */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route exact path='/' element={<ProtectedRoute/>}>
            <Route exact path='/' element={<HomePage/>}/>
          </Route>

          <Route exact path='/buy' element={<ProtectedRoute/>}>
            <Route exact path='/buy' element={<BuyPage/>}/>
          </Route>

          <Route exact path='/sell' element={<ProtectedRoute/>}>
            <Route exact path='/sell' element={<SellPage/>}/>
          </Route>

          <Route exact path='/rent' element={<ProtectedRoute/>}>
            <Route exact path='/rent' element={<RentPage/>}/>
          </Route>

          <Route exact path='/car-details/:id' element={<ProtectedRoute/>}>
            <Route exact path='/car-details/:id' element={<CarDetail/>}/>
          </Route>

          {/* <ProtectedRoute path="/" element={<HomePage />} />
          <ProtectedRoute path="/buy" element={<BuyPage />} />
          <ProtectedRoute path="/sell" element={<SellPage />} />
          <ProtectedRoute path="/rent" element={<RentPage />} />
          <ProtectedRoute exact path="/" element={<HomePage />} />
          <ProtectedRoute path="/car-details" element={<CarDetail/>} /> */}

          {/* More protected routes can be added here */}
        </Routes>
       
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/car-details/:id" element={<CarDetail/>} />
      </Routes> */}
    </Router>
  );
}

export default App;
