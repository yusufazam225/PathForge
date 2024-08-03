import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import UserContext from './context/UserContext';
import './App.css';

const Display = () => {
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  const navigateTo = (coordinatesArray, grid) => {
    navigate('/displaypoints', { state: { coordinatesArray, grid } });
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_PORT}/api/users/display`)
      .then((response) => {
        setArr(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.log(error);
        // Set loading to false in case of error
      });
  }, []);

  if (loading) {
    return (
        
        
       
      <div className="loader" style={{marginTop:'20%',marginLeft:'50%'}}>
       
   
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="grid-container">
        {arr.map((data) => {
          return (
            <div className="grid-item" key={data._id}>
              <img src={data.imageData} style={{ height: '300px', width: '300px' }} onClick={() => navigateTo(data.coordinatesArray, data.grid)} />
              <p>{data.userinfo}</p>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Display;
