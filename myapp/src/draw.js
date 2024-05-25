import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from './context/UserContext'
import PaintbrushCursor from "./Paintbrushcurson";
import html2canvas from 'html2canvas';
import { VscDebugRestart } from "react-icons/vsc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function distance(point1, point2) {
  return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
}
const comp = (p1, p2) => {
  if (p1.x === p2.x && p2.y === p1.y)
    return 1;
  else
    return 0;
}
const checker = (pt1, pt2, pt3, pt4) => {

  if ((comp(pt1, pt3) && comp(pt2, pt4)) || (comp(pt1, pt4) && comp(pt2, pt3))) {
    return true;
  }

  return false;


}
function Draw() {
  const { userinfo } = useContext(UserContext);

  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [grid, setgrid] = useState([]);
  const navigate = useNavigate();
  const insert = (imageData) => {

      
    axios.post(`${process.env.REACT_APP_PORT}/api/users/insertpoints`, { coordinatesArray, grid, userinfo, imageData }).catch((error) => console.log(`error in draw:${error}`));
    navigate('/');
  }

  useEffect(() => {
    const len = coordinatesArray.length;
    if (len > 1) {
      const startPoint = coordinatesArray[len - 1];
      const endPoint = coordinatesArray[len - 2];
      setgrid(prevgrid => ([...prevgrid, { startPoint, endPoint }]))
    }
  }, [coordinatesArray])
  const checkfunc = (newPoint) => {

    const len = coordinatesArray.length;
    const len2 = grid.length;
    console.log(len);
    if (len === 0) return true;

    const prevPoint = coordinatesArray[len - 1];
    if (newPoint.x === prevPoint.x && newPoint.y === prevPoint.y) return false;
    if (len2 === 0) return 1;
    for (const existingPoint of grid) {

      if (checker(existingPoint.startPoint, existingPoint.endPoint, newPoint, prevPoint)) {
        return false;
      }

    }
    return true;
  }







  const [capturedImage, setCapturedImage] = useState(null);
  const screenshotRef = useRef(null);

  const takeScreenshot = () => {
    html2canvas(screenshotRef.current, { x: 0, y: 70, width: 950, height: 700 }).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');
      setCapturedImage(imageData); // Store the captured image data in state
      insert(imageData);
    });
  };


  const nullvalue = () => {
    setgrid([]);
    setCoordinatesArray([]);
  }


  const handleClick = (event) => {

    if (event.button === 0) { // Check if left mouse button is clicked
      const { clientX, clientY } = event;

      const svgElement = document.querySelector('svg');

      if (!svgElement) return;

      // Get the position and dimensions of the SVG element
      const svgRect = svgElement.getBoundingClientRect();

      // Calculate the relative coordinates within the SVG element
      const relativeX = clientX - svgRect.left;
      const relativeY = clientY - svgRect.top;
      if (relativeX >= 950) return;
      let newPoint = { x: relativeX, y: relativeY };






      // Check if new point is close to any existing point

      for (const existingPoint of coordinatesArray) {
        if (distance(existingPoint, newPoint) < 20) { // Adjust the distance threshold as needed
          newPoint.x = existingPoint.x; newPoint.y = existingPoint.y;
          break;
        }
      }
      if (checkfunc(newPoint)) {
        setCoordinatesArray(prevArray => [...prevArray, newPoint]);
      }
      else {
        toast.warning("Wrong Move");
      }

    }
  };

  return <React.Fragment>
    <div ref={screenshotRef} onClick={handleClick} style={{ height: '100vh', position: 'relative', backgroundColor: "black" }} >
      <h1 style={{ marginLeft: '300px', color: 'white' }}>Draw here</h1>
      <svg style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}>
        {coordinatesArray.map((coordinate, index) => (
          <circle
            key={index}
            cx={coordinate.x}
            cy={coordinate.y}
            r="10"
            fill="red"
          />
        ))}
        {coordinatesArray.map((coordinate, index) => {
          if (index > 0) {
            const prevCoordinate = coordinatesArray[index - 1];

            return (
              <line
                key={index}
                x1={prevCoordinate.x}
                y1={prevCoordinate.y}
                x2={coordinate.x}
                y2={coordinate.y}
                stroke="red"
                strokeWidth="2"
              />
            );
          } else {
            return null; // If it's the first coordinate, no line to draw
          }
        })}
        <line x1="950" y1="0" x2="950" y2="100%" stroke="white" strokeWidth="2" />
      </svg>





      <button className="button-29" style={{ marginTop: '0px', marginLeft: '950px', height: '50px', width: '100px', fontSize: '30px' }} onClick={nullvalue}><VscDebugRestart /></button>
      <button className="button-29" style={{ marginTop: '600px', marginLeft: '950px', height: '100px', width: '200px', fontSize: '30px' }} onClick={takeScreenshot}>Submit</button>
      {capturedImage && (
        <div>

          <img src={capturedImage} alt="Captured" />
        </div>
      )}
      <PaintbrushCursor />

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
}
export default Draw; 