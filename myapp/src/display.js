import React, { useContext, useEffect, useState } from "react"
import {Link,useNavigate} from "react-router-dom"
import axios from 'axios';
import UserContext from './context/UserContext'
import './App.css'
const Display=()=>{
  const [arr,setarr]=useState([]);
  
  const navigate=useNavigate();
 const navigateto=(coordinatesArray,grid)=>{
    
    navigate('/displaypoints',{state:{coordinatesArray,grid}});
 }
    useEffect(()=>{
        axios.get('http://localhost:8000/api/users/display').then((response)=>setarr(response.data)).catch((error)=>console.log(error));
        
    },[]);
   
  
  
return <React.Fragment>
 
 <div >
     {arr.map((data)=>{
       return <div key={data._id}>
        <h1>{data.userinfo}</h1>
        <button onClick={()=>navigateto(data.coordinatesArray,data.grid)}>clickme</button>
        </div>
     })}
    </div>

</React.Fragment>
}
export default Display;