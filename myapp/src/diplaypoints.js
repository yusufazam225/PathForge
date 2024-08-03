import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaintbrushCursor from "./Paintbrushcurson";
import { VscDebugRestart } from "react-icons/vsc";

function distance(point1, point2) {
  return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
}

const comp = (p1, p2) => (p1.x === p2.x && p2.y === p1.y ? 1 : 0);

const checker = (pt1, pt2, pt3, pt4) => (
  (comp(pt1, pt3) && comp(pt2, pt4)) || (comp(pt1, pt4) && comp(pt2, pt3))
);

const Displaypoints = () => {
  const { state } = useLocation();
  const { coordinatesArray, grid } = state;
  const [newgrid, setnewgrid] = useState([]);
  const [carr, setcarr] = useState([]);

  const nullvalue = () => {
    setnewgrid([]);
  };

  useEffect(() => {
    const svgElement = document.querySelector('svg');
    if (!svgElement) return;

    const svgRect = svgElement.getBoundingClientRect();
    const centerX = svgRect.width / 2;

    coordinatesArray.forEach(coordinate => {
      const cx = coordinate.x+0.5;
      const cy = coordinate.y ;
      setcarr(prev => [...prev, { x: cx, y: cy }]);
    });
  }, [coordinatesArray]);

  const checkaccuracy = (e) => {
    e.preventDefault();
    let cnt = 0;
    const len = carr.length;
    const len2=newgrid.length;
    
    
    newgrid.forEach((givenPoint, index) => {
        
      if (index > 0) {
        const givenprevpoint = newgrid[index - 1];
       
        carr.forEach((coordinate, index) => {
         
          if (index > 0 && 2*index<len) {
            const prev = carr[index - 1];
           
            if (checker(coordinate, prev, givenprevpoint, givenPoint)) {
              
              cnt++;
            }
          }
        });
      }
    });
    console.log(cnt,len2,len);
    if (len2*2 === len && cnt==len2-1) {
      toast.success("passed");
    } else {
      toast.error("Wrong");
    }
  };

  const checkfunc = (newPoint) => {
    const len = newgrid.length;
    if (len === 0) return true;
    const prevPoint = newgrid[len - 1];
    if (comp(newPoint, prevPoint)) return false;
    if (len === 1) return true;

    let flag = true;
    newgrid.forEach((existingPoint, index) => {
      if (index > 0) {
        const PrevPoint = newgrid[index - 1];
        if (checker(PrevPoint, existingPoint, newPoint, prevPoint)) {
          flag = 0;
        }
      }
    });
    return flag;
  };

  const handleClick = (event) => {
    if (event.button === 0) { // Check if left mouse button is clicked
      const { clientX, clientY } = event;
      const svgElement = document.querySelector('svg');
      if (!svgElement) return;

      const svgRect = svgElement.getBoundingClientRect();
      const relativeX = ((clientX - svgRect.left) / svgRect.width) ;
      const relativeY = ((clientY - svgRect.top) / svgRect.height) ;
      if (relativeY > 1) return;

      let newPoint = { x: relativeX, y: relativeY };
      for (const existingPoint of carr) {
       // console.log(existingPoint);
        if (distance(existingPoint, newPoint) < 0.02) { // Adjust the distance threshold as needed
          newPoint = existingPoint;
          break;
        }
      }
      
      if (!carr.some(givenPoint => comp(newPoint, givenPoint))) return;
     // console.log(newPoint);
      if (checkfunc(newPoint)) {
        
        setnewgrid(prev => [...prev, newPoint]);
      } else {
        toast.warning("Wrong Move");
      }
    }
  };

  return (
    <React.Fragment>
      <div onClick={handleClick} style={{ height: '52.9rem', width: '100%', position: 'relative', backgroundColor: 'black', display: 'flex', justifyContent: 'space-between', flexWrap:'wrap', width: '100%'}}>
        <div style={{ display: 'flex', border: 'solid', borderColor: 'green', height: '100%', width: '50%' , flex: 1, minWidth: '200px'}}>
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
          </svg>
        </div>
        <div style={{ display: 'flex', border: 'solid', borderColor: 'blue', height: '100%', width: '50%', flex:1 }}>
          <svg style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}>

          {carr.map((coordinate, index) => (
              <circle
                key={index}
                cx={`${coordinate.x*100}%`}
                cy={`${coordinate.y*100}%`}
                r="1%"
                fill="red"
              />
            ))}


            {newgrid.map((coordinate, index) => (
              <circle
                key={index}
                cx={`${coordinate.x*100}%`}
                cy={`${coordinate.y*100}%`}
                r="1%"
                fill="green"
              />
            ))}
            {newgrid.map((coordinate, index) => {
              if (index > 0) {
                const prevCoordinate = newgrid[index - 1];
                return (
                  <line
                    key={index}
                    x1={`${prevCoordinate.x*100}%`}
                    y1={`${prevCoordinate.y*100}%`}
                    x2={`${coordinate.x*100}%`}
                    y2={`${coordinate.y*100}%`}
                    stroke="green"
                    strokeWidth="2"
                  />
                );
              } else {
                return null;
              }
            })}
          </svg>
         
          <PaintbrushCursor />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
  <div style={{ backgroundColor: 'green', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <button className="button-29" onClick={checkaccuracy} style={{ marginLeft: '10px', width: '50%' }}>Submit</button>
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

export default Displaypoints;
