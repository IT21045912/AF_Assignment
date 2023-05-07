import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/User/Register';
import Login from './pages/User/Login';
import AddHarvest from './pages/AddHarvest';
import AddFertilizer from './pages/FertilizerOrder/AddFertilizer';
import FarmerRegister from './pages/User/FarmerRegister';
import ShowCardVeiew from './pages/HarvestShop';
import ShowAllFertilizer from './pages/FertilizerOrder/FertilizerShop';
import ViewItems from './pages/FertilizerOrder/viewFertilizerItem';
import NavBar from './Components/NavBar';
import AdminDash from './pages/Admin/AdminDash';
import LoanForm from './pages/Loan/LoanForm';
import LoanRequests from './pages/Admin/LoanRequests';

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
        <Route exact path="/buyharvest" element ={<ShowCardVeiew/>}/>
        <Route exact path="/buyfertilizer" element ={<ShowAllFertilizer/>}/>
        <Route exact path="/viewfertilizer" element ={<ViewItems/>}/>
        <Route exact path="/addLoan" element ={<LoanForm/>}/>
        <Route exact path="/RequestedLoans" element ={<LoanRequests/>}/>
      </Routes>
    </>
  );
}

export default App;
