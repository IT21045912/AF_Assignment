import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/User/Register';
import Login from './pages/User/Login';
import FarmerRegister from './pages/User/FarmerRegister';
import NavBar from './Components/NavBar';
import Farmer from './pages/Farmer';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/FarmerRegister" element={<FarmerRegister />} />
        <Route exact path="/Farmer" element={<Farmer />} />
      </Routes>
    </>
  );
}

export default App;
