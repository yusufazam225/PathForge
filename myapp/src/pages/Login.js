
import axios from "axios";
import React, { useState ,useContext} from "react"
import { Link ,useNavigate} from "react-router-dom";
import UserContext from "../context/UserContext";
const Login=()=>{
    const navigate=useNavigate();
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const {setuserinfo,settoken}=useContext(UserContext);
    const [direct,setdirect]=useState(false);
    const login=async(e)=>{
        e.preventDefault();
     await axios.post('http://localhost:8000/api/users/login',{email,password}).then((response)=>{
        setuserinfo(response.data.username);
        settoken(response.data.token);
        setdirect(true)}).catch((error)=>console.log(error));
       
    }
    if(direct)
    {
      
        return navigate('/');
    }
    
return <React.Fragment>
    <div className="login">
       <h1>Login</h1>
       <input className="button-85" placeholder="Email" value={email} onChange={(e)=>setemail(e.target.value)}/>
     
       <input className="button-85" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
       
       <button className="button-85" onClick={login}>Login</button>
    </div>
</React.Fragment>
}
export default Login;