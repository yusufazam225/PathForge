import React, { useContext } from "react"
import {Link} from "react-router-dom"
import axios from 'axios';
import UserContext from './context/UserContext'
import './App.css'
const Navbar=()=>{
  const {userinfo,setuserinfo}=useContext(UserContext);
  const logout=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:8000/api/users/logout').catch((error)=>console.log(error));
    setuserinfo(null);
  }
return <React.Fragment>
 
 <div className="navbar">
      <ul>
        
        <li className="left"><Link to="/">Home</Link></li>
        
       {userinfo?<li className="right"><Link onClick={logout} to="/">{userinfo}/logout</Link></li>:<li className="right"><Link to="/register">Register</Link></li>}
      
      </ul>
    </div>

</React.Fragment>
}
export default Navbar;