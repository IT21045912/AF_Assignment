import './App.css';
import Home from './pages/Home';
import { Route,  Routes } from 'react-router-dom';
import Register from './pages/User/Register';
import Login from './pages/User/Login';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element ={<Home/>}/>
        <Route exact path="/Register" element ={<Register/>}/>
        <Route exact path="/Login" element ={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
