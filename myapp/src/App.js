import React from 'react';
import {Outlet} from 'react-router-dom';
import './App.css';

import Navbar from './Navbar.js';

import OTP from './pages/OTP.js'
import Register from './home.js';

function App() {
  return <React.Fragment>

        <Navbar/>
        
        <Outlet/>
       
        
    
  </React.Fragment>
}

export default App;
