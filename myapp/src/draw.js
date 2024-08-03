import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from './context/UserContext';
import PaintbrushCursor from "./Paintbrushcurson";
import html2canvas from 'html2canvas';
import { VscDebugRestart } from "react-icons/vsc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function distance(point1, point2) {
  return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
}

const comp = (p1, p2) => (p1.x === p2.x && p2.y === p1.y) ? 1 : 0;

const checker = (pt1, pt2, pt3, pt4) => (
  (comp(pt1, pt3) && comp(pt2, pt4)) || (comp(pt1, pt4) && comp(pt2, pt3))
);

function Draw() {
  const { userinfo } = useContext(UserContext);
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [grid, setgrid] = useState([]);
  const navigate = useNavigate();

  const insert = (imageData) => {
    axios.post(`${process.env.REACT_APP_PORT}/api/users/insertpoints`, { coordinatesArray, grid, userinfo, imageData })
      .catch((error) => console.log(`error in draw:${error}`));
    navigate('/');
  };

  useEffect(() => {
    const len = coordinatesArray.length;
    if (len > 1) {
      const startPoint = coordinatesArray[len - 1];
      const endPoint = coordinatesArray[len - 2];
      setgrid(prevgrid => ([...prevgrid, { startPoint, endPoint }]));
    }
  }, [coordinatesArray]);

  const checkfunc = (newPoint) => {
    const len = coordinatesArray.length;
    const len2 = grid.length;
    if (len === 0) return true;

    const prevPoint = coordinatesArray[len - 1];
    if (newPoint.x === prevPoint.x && newPoint.y === prevPoint.y) return false;
    if (len2 === 0) return true;

    for (const existingPoint of grid) {
      if (checker(existingPoint.startPoint, existingPoint.endPoint, newPoint, prevPoint)) {
        return false;
      }
    }
    return true;
  };

  const [capturedImage, setCapturedImage] = useState(null);
  const screenshotRef = useRef(null);

  const takeScreenshot = () => {
    const screenshotElement = screenshotRef.current;
  if (!screenshotElement) return;
    const rect = screenshotElement.getBoundingClientRect();
    const width = rect.width / 2;
    const height=rect.height;
    const height1=0;
    html2canvas(screenshotRef.current, { x: 0, y:height1, width: width, height: height }).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');
      setCapturedImage(imageData);
      insert(imageData);
    });
  };

  const nullvalue = () => {
    setgrid([]);
    setCoordinatesArray([]);
  };

  const handleClick = (event) => {
    if (event.button === 0) { // Check if left mouse button is clicked
      const { clientX, clientY } = event;
      const svgElement = document.querySelector('svg');

      if (!svgElement) return;

      const svgRect = svgElement.getBoundingClientRect();
      const relativeX = (clientX - svgRect.left) / svgRect.width;
      const relativeY = (clientY - svgRect.top) / svgRect.height;
      if (relativeX >= 0.5) return;

      let newPoint = { x: relativeX, y: relativeY };

      for (const existingPoint of coordinatesArray) {
        if (distance(existingPoint, newPoint) < 0.02) { // Adjust the distance threshold as needed
          newPoint.x = existingPoint.x;
          newPoint.y = existingPoint.y;
          break;
        }
      }

      if (checkfunc(newPoint)) {
        setCoordinatesArray(prevArray => [...prevArray, newPoint]);
      } else {
        toast.warning("Wrong Move");
      }
    }
  };

  return (
    <React.Fragment>
      <div ref={screenshotRef} onClick={handleClick} style={{ height: '64rem', position: 'relative', backgroundColor: "black", display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ borderStyle: 'solid', borderColor: 'green', width: '50%' }}>
          <h1 style={{ marginLeft: '30%',marginTop:'30%', color: 'grey' }}>{coordinatesArray.length===0?"Draw Here":""}</h1>
          <svg style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}>
            {coordinatesArray.map((coordinate, index) => (
              <circle
                key={index}
                cx={`${coordinate.x * 100}%`}
                cy={`${coordinate.y * 100}%`}
                r="1%"
                fill="red"
              />
            ))}
            {coordinatesArray.map((coordinate, index) => {
              if (index > 0) {
                const prevCoordinate = coordinatesArray[index - 1];
                return (
                  <line
                    key={index}
                    x1={`${prevCoordinate.x * 100}%`}
                    y1={`${prevCoordinate.y * 100}%`}
                    x2={`${coordinate.x * 100}%`}
                    y2={`${coordinate.y * 100}%`}
                    stroke="red"
                    strokeWidth="2"
                  />
                );
              } else {
                return null;
              }
            })}
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        <div style={{ borderStyle: 'solid', borderColor: 'red', width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          
          <div style={{ color: 'red', display: 'flex', justifyItems: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Please sign in first before contributing</h3>
            <h3>Click anywhere in the drawing area to draw figure</h3>
          </div>
         

          {capturedImage && (
            <div>
              <img src={capturedImage} alt="Captured" />
            </div>
          )}
          <PaintbrushCursor />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
  <div style={{ backgroundColor: 'green', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <button className="button-29" onClick={takeScreenshot} style={{ marginLeft: '10px', width: '50%' }}>Submit</button>
  </div>
  <div style={{ backgroundColor: 'red', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <button className="button-29" onClick={nullvalue} style={{ width: '50%' }}>
      <VscDebugRestart />
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
}

export default Draw;
