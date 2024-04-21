
import React, { useState } from "react"
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';




const Register=()=>{
    const navigate=useNavigate();
    const [email,setemail]=useState('');
    

  const generateRandomNumber = () => {
    const min = 1000; // Minimum 6-digit number
    const max = 9999; // Maximum 6-digit number
    const newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return newRandomNumber;
  };
    const ClickFunction=async(e)=>{
        e.preventDefault();
        const randomNumber=generateRandomNumber();
        

        await axios.post('http://localhost:8000/api/users/smtp',{email:email,otp:randomNumber}).then((response)=>{
            console.log(`${response.data.email}`);
            navigate('/OTP',{state:{OTP:randomNumber,EMAIL:email}});
        }).catch((error)=>{
            console.log(`error in smtp:${error}`)
        })
       


    }
return <React.Fragment>
    <div>
        <form>
            <label>Email:</label>
            <input type="text" placeholder="Email" value={email} onChange={(e)=>setemail(e.target.value)}/>
            
            <button onClick={ClickFunction} >Next</button>
        </form>
    <p>Already have an account?<Link to="/login">Login</Link></p>
    </div>
</React.Fragment>
}
export default Register;