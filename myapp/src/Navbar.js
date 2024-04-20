import React from "react"
import {Link} from "react-router-dom"
import './App.css'
const Navbar=()=>{
return <React.Fragment>
    <div className="Navbar">
      <Link to='/register'> Register/Login</Link>
    </div>
</React.Fragment>
}
export default Navbar;