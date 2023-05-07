import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/User/Register';
import Login from './pages/User/Login';
import AddHarvest from './pages/AddHarvest';
import AddFertilizer from './pages/AddFertilizer';
import FarmerRegister from './pages/User/FarmerRegister';
import NavBar from './Components/NavBar';
import AdminDash from './pages/Admin/AdminDash';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element ={<Home/>}/>
        <Route exact path="/Register" element ={<Register/>}/>
        <Route exact path="/Login" element ={<Login/>}/>
        <Route exact path="/AdminDash" element ={<AdminDash/>}/>
        <Route exact path="/addHarvest" element ={<AddHarvest/>}/>
        <Route exact path="/addFertilizer" element ={<AddFertilizer/>}/>
        <Route exact path="/FarmerRegister" element ={<FarmerRegister/>}/>
      </Routes>
    </>
  );
}

export default App;
