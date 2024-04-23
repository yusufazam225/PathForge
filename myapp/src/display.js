import React, { useContext, useEffect, useState } from "react"
import {Link} from "react-router-dom"
import axios from 'axios';
import UserContext from './context/UserContext'
import './App.css'
const Display=()=>{
  const [arr,setarr]=useState([]);
 
    useEffect(()=>{
        axios.get('http://localhost:8000/api/users/display').then((response)=>setarr(response.data)).catch((error)=>console.log(error));
    },[]);
   
  
  
return <React.Fragment>
 
 <div >
     {arr.map((data)=>data.userinfo)}
    </div>

</React.Fragment>
}
export default Display;