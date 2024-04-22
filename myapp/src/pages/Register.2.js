
import axios from "axios";
import React, { useState } from "react"
import {useLocation,useNavigate} from 'react-router-dom';
const Register2=()=>{
    const {state}=useLocation();
    const navigate=useNavigate();
    const {email}=state;
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const submitdetails=async(e)=>{
        e.preventDefault();
        const response=await axios.post('http://localhost:8000/api/users/register',{email,username,password}).catch((error)=>{
        console.log(error);
        });
        
        if(response.status===203)
        {
            console.log('error');
        }
        if(response.status===200)
        {
            navigate('/');
        }

    }
return <React.Fragment>
    
        <form className="login">
            
            <input className="button-85" placeholder="Username" value={username} onChange={(e)=>setusername(e.target.value)}/>
           
            <input className="button-85" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
            <button className="button-85" onClick={submitdetails}>Register</button>
        </form>
    
   
</React.Fragment>
}
export default Register2;