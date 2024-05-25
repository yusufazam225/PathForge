import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "./context/UserContext";
import { FaHome } from "react-icons/fa";
import "./App.css";
const Navbar = () => {
  const { userinfo, setuserinfo} = useContext(UserContext);
  const logout = (e) => {
    e.preventDefault();
   localStorage.removeItem('token');
   
    setuserinfo(null);
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PORT}/api/users/profile`,{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) =>  setuserinfo(response.data.username))
      .catch((error) => console.log(error));
  });

  return (
    <React.Fragment>
      <div className="navbar">
        <ul>
          <li className="left">
            <Link to="/">Home</Link>
          </li>

          {userinfo ? (
            <li className="right">
              <Link onClick={logout} to="/">
                {userinfo}/logout
              </Link>
            </li>
          ) : (
            <li className="right">
              <Link to="/register">Register</Link>
            </li>
          )}
        </ul>
      </div>
    </React.Fragment>
  );
};
export default Navbar;
