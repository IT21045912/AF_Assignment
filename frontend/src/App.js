import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/User/Register';
import Login from './pages/User/Login';
import AddHarvest from './pages/HarvestHandling/AddHarvest';
import AddFertilizer from './pages/FertilizerOrder/AddFertilizer';
import FarmerRegister from './pages/User/FarmerRegister';
import ShowCardVeiew from './pages/HarvestHandling/HarvestShop';
import ShowAllFertilizer from './pages/FertilizerOrder/FertilizerShop';
import ViewItems from './pages/FertilizerOrder/viewFertilizerItem';
import ViewHarvestItem from './pages/HarvestHandling/viewHarvestItem';
import NavBar from './Components/NavBar';
import Fertilizer from './pages/FertilizerOrder/Fertilizer';
import ViewFertilizer from './pages/FertilizerOrder/ViewFertilizer';
import UpdateFertilizer from './pages/FertilizerOrder/UpdateFertilizer';
import HarvestListing from './pages/HarvestHandling/HarvestListing';
import HarvestCart from './pages/HarvestHandling/harvestCart';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/addHarvest" element={<AddHarvest />} />
        <Route exact path="/addFertilizer" element={<AddFertilizer />} />
        <Route exact path="/FarmerRegister" element={<FarmerRegister />} />
        <Route exact path="/buyharvest" element={<ShowCardVeiew />} />
        <Route exact path="/buyfertilizer" element={<ShowAllFertilizer />} />
        <Route exact path="/viewfertilizer" element={<ViewItems />} />
        <Route exact path="/viewharvest" element={<ViewHarvestItem />} />
        <Route exact path="/FertilizerAdmin" element={<Fertilizer />} />
        <Route exact path="/FertilizerViewPage" element={<ViewFertilizer />} />
        <Route exact path="/FertilizerUpdate" element={<UpdateFertilizer />} />
        <Route exact path="/HarvestListing" element={<HarvestListing />} />
        <Route exact path="/HarvestCart" element={<HarvestCart />} />
      </Routes>
    </>
  );
}

export default App;
