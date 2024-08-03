import React, { useRef, useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import UserContext from "./context/UserContext";
import html2canvas from "html2canvas";
import "./points.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { userinfo, setuserinfo} = useContext(UserContext);
  const navigate = useNavigate();
  const draw = () => {
    if(!userinfo)
    {
      toast.warning("Register First");
    }
    else
    navigate("/draw");
  };
  const display = () => {
    if(!userinfo)
    {
      toast.warning("Register First");
    }
    else
    navigate("/display");
  };
 

  return (
    <React.Fragment>
      <div className="testing" style={{display:'flex',flexDirection:'column'}}>
        <h1 >Pathforge</h1>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
          
          <button className="button-85" style={{margin:'10%',height:'100px',width:'200px',alignItems:'center'}} onClick={display}>
            Challenge
          </button>
         
          <button onClick={draw} style={{margin:'10%' ,height:'100px',width:'200px'}} className="button-85">
            Contribute
          </button>
        
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </React.Fragment>
  );
};
export default Register;
