import React, { useEffect, useState ,useContext} from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from './context/UserContext'

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
  const {userinfo}=useContext(UserContext);
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [grid,setgrid]=useState([]);
  const navigate=useNavigate();
  const insert=(e)=>{
    e.preventDefault();
   
    axios.post('http://localhost:8000/api/users/insertpoints',{coordinatesArray,grid,userinfo}).catch((error)=>console.log(`error in draw:${error}`));
    navigate('/');
  }
 
  useEffect(()=>{
    const len=coordinatesArray.length;
    if(len>1)
    {
      const startPoint=coordinatesArray[len-1];
      const endPoint=coordinatesArray[len-2];
      setgrid(prevgrid=>([...prevgrid,{startPoint,endPoint}]))
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
        
        if(checker(existingPoint.startPoint,existingPoint.endPoint,newPoint,prevPoint))
        {
          return false;
        }
        
    }
    return true;
  }
  const handleClick = (event) => {

    if (event.button === 0) { // Check if left mouse button is clicked
      const { clientX, clientY } = event;
      if(clientX>=950)return;
      let newPoint = { x: clientX, y: clientY-72 };
      
     
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
    <div onClick={handleClick} style={{ height: '100vh', position: 'relative' }} >
       <h1 style={{marginLeft:'300px'}}>Draw here</h1>
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
           <line x1="950" y1="0" x2="950" y2="100%" stroke="black" strokeWidth="2" />
      </svg>
      <div style={{marginTop:'300px',marginLeft:'1000px'}}>
      <input className="button-85" placeholder="Name your Puzzle" />
      &nbsp;
      <button className="button-85" onClick={insert}>submit</button>
      </div>
     
    </div>
  );
}
export default Draw; 