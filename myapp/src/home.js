import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import html2canvas from "html2canvas";
import "./points.css";

const Register = () => {
  const navigate = useNavigate();
  const draw = () => {
    navigate("/draw");
  };
  const display = () => {
    navigate("/display");
  };

  return (
    <React.Fragment>
      <div className="testing">
        <h1>Pathforge</h1>
        <div className="Home">
          <button className="button-85" onClick={display}>
            Solve Puzzle
          </button>
          <button onClick={draw} className="button-85">
            Contribute
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Register;
