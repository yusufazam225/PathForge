import React from 'react';
import {Outlet} from 'react-router-dom';
import './App.css';
import Draw from './draw';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Navbar from './Navbar.js';

function App() {
  return <React.Fragment>

        <Navbar/>
        <Outlet/>
        
    
  </React.Fragment>
}

export default App;
