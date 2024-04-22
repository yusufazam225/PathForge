import React from "react"
import {Link} from "react-router-dom"
import './App.css'
const Navbar=()=>{
return <React.Fragment>
 
 <div className="navbar">
      <ul>
        
        <li className="left"><Link to="/">Home</Link></li>
        
        <li className="right"><Link to="/register">Register</Link></li>
      </ul>
    </div>

</React.Fragment>
}
export default Navbar;