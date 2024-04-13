import React, { useEffect, useState } from "react";
import './App.css';

function distance(point1, point2) {
  return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
}
const comp=(p1,p2)=>{
  if(p1.x===p2.x && p2.y===p1.y)
  return 1;
else
return 0;
}
const checker=(pt1,pt2,pt3,pt4)=>{
  
  if((comp(pt1,pt3) && comp(pt2,pt4) )|| (comp(pt1,pt4) && comp(pt2,pt3)))
  {
    return true;
  }

  return false;
  
        
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
  const checkfunc=(newPoint)=>{
    
    const len=coordinatesArray.length;
    const len2=grid.length;
    console.log(len);
    if(len===0)return true;
   
    const prevPoint=coordinatesArray[len-1];
    if(newPoint.x===prevPoint.x && newPoint.y===prevPoint.y)return false;
    if(len2===0)return 1;
    for(const existingPoint of grid)
    {
        
        if(checker(existingPoint[0],existingPoint[1],newPoint,prevPoint))
        {
          return false;
        }
        
    }
    

   
    return true;
  }
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
      if(checkfunc(newPoint))
      {
        setCoordinatesArray(prevArray => [...prevArray, newPoint]);
      }
      else{
        alert("Wrong Move");
      }
   
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