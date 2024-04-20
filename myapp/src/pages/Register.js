
import React, { useState } from "react"
import { Link } from "react-router-dom";
import axios from 'axios';




const Register=()=>{
    const [email,setemail]=useState('');
    const ClickFunction=async(e)=>{
        e.preventDefault();
        await axios.post('http://localhost:8000/api/users/smtp',{email:email}).then((response)=>{
            console.log(`${response.data.email}`);
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