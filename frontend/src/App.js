import './App.css';
import Home from './pages/Home';
import { Route,  Routes } from 'react-router-dom';
import Register from './pages/User/Register';
import Login from './pages/User/Login';
import AddHarvest from './pages/AddHarvest';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element ={<Home/>}/>
        <Route exact path="/Register" element ={<Register/>}/>
        <Route exact path="/Login" element ={<Login/>}/>
        <Route exact path="/addHarvest" element ={<AddHarvest/>}/>
      </Routes>
    </>
  );
}

export default App;
