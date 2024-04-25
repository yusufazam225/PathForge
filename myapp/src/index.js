import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './home.js'
import App from './App';
import Login from './pages/Login'
import reportWebVitals from './reportWebVitals';
import { RouterProvider,createBrowserRouter,createRoutesFromElements,Route} from 'react-router-dom';
import Register from './pages/Register.js'
import OTP from './pages/OTP.js'
import Register2 from './pages/Register.2.js'
import Draw from  './draw.js';
import Display from './display.js'
import Displaypoints from './diplaypoints.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='register2' element={<Register2/>}/>
      <Route path='OTP' element={<OTP/>}/>
      <Route path='draw' element={<Draw/>}/>
      <Route path='display' element={<Display/>}/>
      <Route path='displaypoints' element={<Displaypoints/>}/>

    </Route>
  )
)
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
