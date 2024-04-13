import React, { useEffect, useState } from "react";
import './App.css';

function distance(point1, point2) {
  return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
}
function Draw(){
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [grid,setgrid]=useState([]);
 
  useEffect(()=>{
    const len=coordinatesArray.length;
    if(len>1)
    {
      const value1=coordinatesArray[len-1];
      const value2=coordinatesArray[len-2];
      setgrid(prevgrid=>([...prevgrid,[value2,value1]]))
    }
  },[coordinatesArray])
  const handleClick = (event) => {
    if (event.button === 0) { // Check if left mouse button is clicked
      const { clientX, clientY } = event;
      let newPoint = { x: clientX, y: clientY };

      // Check if new point is close to any existing point
     
      for (const existingPoint of coordinatesArray) {
        if (distance(existingPoint, newPoint) < 20) { // Adjust the distance threshold as needed
         newPoint.x=existingPoint.x;newPoint.y=existingPoint.y;
          break;
        }
      }

        
        setCoordinatesArray(prevArray => [...prevArray, newPoint]);
       
        
      
    }
  };

  return (
    <div onClick={handleClick} style={{ height: '100vh', position: 'relative' }}>
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
      </svg>
     
    </div>
  );
}
export default Draw; 