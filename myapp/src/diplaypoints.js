import React, { useState,useEffect } from "react";
import {useLocation} from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaintbrushCursor from "./Paintbrushcurson";
import { VscDebugRestart } from "react-icons/vsc";

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



const Displaypoints=()=>{
    const {state}=useLocation();
    const {coordinatesArray,grid}=state;
    const [newgrid,setnewgrid]=useState([]);
  
    const [carr,setcarr]=useState([]);


    const nullvalue=()=>{
  setnewgrid([]);
 
    }
    useEffect(()=>{
      coordinatesArray.map((coordinate, index) => 
        {
          const cx=coordinate.x+950;
            const cy=coordinate.y
          return (
            setcarr((prevcarr)=>[...prevcarr,{x:cx,y:cy}])
          );
        }
      )
    },[])

    const checkaccuracy=(e)=>{
      e.preventDefault();
      let cnt=0;
      const len=grid.length;
      
      carr.map((givenPoint,index)=>
      {
        if(index>0)
        {
          const givenprevpoint=carr[index-1];
        newgrid.map((coordinate,index)=>{
          
          if(index>0)
          {
            const prev=newgrid[index-1];
         
            if(checker(coordinate,prev,givenprevpoint,givenPoint))
            {
              cnt++;
            }
          }
          
        })
      }
      })
     
     
    
     

      if(cnt==2*len+1)
      {
       toast.success("passed");
      }
      else{
        toast.error("Wrong");
      }
      
    }

    

    const checkfunc=(newPoint)=>{
    
      const len=newgrid.length;
     
      
      if(len===0)return true;
     
      const prevPoint=newgrid[len-1];
      if(comp(newPoint,prevPoint))return false;
      if(len===1)return true;
      let flag=true;
     newgrid.map((existingPoint,index)=>
      {
        
          if(index>0)
          {
            const PrevPoint=newgrid[index-1];
          if(checker(PrevPoint,existingPoint,newPoint,prevPoint))
          {
            flag=0;
            return 0;
          }
        }
          
      })
      return flag;
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
       
        let newPoint = { x: relativeX, y: relativeY };
        if(newPoint.y>800)return;
          
        for (const existingPoint of carr) {
          //console.log(existingPoint);
          if (distance(existingPoint, newPoint) < 30) { // Adjust the distance threshold as needed
           newPoint.x=existingPoint.x;newPoint.y=existingPoint.y;
           
            break;
          }
        }
        
        var flag=1;
        
        for(const givenPoint of carr)
        {
          if(comp(newPoint,givenPoint))
          {
              flag=0;
          }
        }
        if(flag)
        {
         
          return ;
        }
          
        // Check if new point is close to any existing point
       
        
        if(checkfunc(newPoint))
        {
          setnewgrid(prevnewgrid => [...prevnewgrid, newPoint]);
        }
        else{
          toast.warning("Wrong Move");
        }
     
    }
    };








return <React.Fragment>
    <div onClick={handleClick} style={{ height: '100vh', position: 'relative',backgroundColor:'black' }}>
     
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


{carr.map((coordinate, index) => (
          <circle
            key={index}
            cx={coordinate.x}
            cy={coordinate.y}
            r="10"
            fill="red"
          />
        ))}
        {newgrid.map((coordinate, index) => (
          <circle
            key={index}
            cx={coordinate.x}
            cy={coordinate.y}
            r="10"
            fill="green"
          />
        ))}



{newgrid.map((coordinate, index) => {
          if (index > 0) {
            const prevCoordinate = newgrid[index - 1];

            return (
              <line
                key={index}
                x1={prevCoordinate.x}
                y1={prevCoordinate.y}
                x2={coordinate.x}
                y2={coordinate.y}
                stroke="green"
                strokeWidth="2"
              />
            );
          } else {
            return null; // If it's the first coordinate, no line to draw
          }
        })}

<line x1="950" y1="0" x2="950" y2="100%" stroke="white" strokeWidth="2" />


      </svg>
     <button className="button-29" onClick={checkaccuracy} style={{marginTop:'750px',marginLeft:'880px',width:'150px',height:'80px',fontSize:'30px'}}>submit</button>
     <button  className="button-29" style={{marginTop:'0px',marginLeft:'0px',height:'50px',width:'100px',fontSize:'30px'}} onClick={nullvalue}><VscDebugRestart/></button>
     <PaintbrushCursor/>
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
export default Displaypoints;