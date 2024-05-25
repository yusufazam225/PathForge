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
        
        axios.get(`${process.env.REACT_APP_PORT}/api/users/display`).then((response)=>setarr(response.data)).catch((error)=>console.log(error));
        
    },[]);
   
  
   
return <React.Fragment>
 
 <div className="grid-container">
     {arr.map((data)=>{
       return <div className="grid-item" key={data._id}>
        <img src={data.imageData} style={{height:'300px',width:'300px'}}  onClick={()=>navigateto(data.coordinatesArray,data.grid)}/>
        <p>{data.userinfo}</p>
        </div>
     })}
    </div>

</React.Fragment>
}
export default Display;