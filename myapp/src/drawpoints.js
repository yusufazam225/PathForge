import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function distance(point1, point2) {
  return Math.sqrt(
    (point1.x - point2.x) ** 2 + (point1.y + 500 - point2.y) ** 2
  );
}
const comp = (p1, p2) => {
  if (p1.x === p2.x && p2.y === p1.y) return 1;
  else return 0;
};
const checker = (pt1, pt2, pt3, pt4) => {
  if (
    (comp(pt1, pt3) && comp(pt2, pt4)) ||
    (comp(pt1, pt4) && comp(pt2, pt3))
  ) {
    return true;
  }

  return false;
};

const Drawpoints = () => {
  const { state } = useLocation();
  const { coordinatesArray } = state;
  const [newgrid, setnewgrid] = useState([]);
  const [connection, setconnection] = useState([]);

  useEffect(() => {
    const len = newgrid.length;
    if (len > 1) {
      const startPoint = newgrid[len - 1];
      const endPoint = newgrid[len - 2];
      setconnection((prevconnnection) => [
        ...prevconnnection,
        { startPoint, endPoint },
      ]);
    }
  }, [newgrid]);

  const checkfunc = (newPoint) => {
    const len = newgrid.length;
    const len2 = connection.length;

    if (len === 0) return true;

    const prevPoint = newgrid[len - 1];
    if (comp(newPoint, prevPoint)) return false;
    if (len2 === 0) return 1;
    for (const existingPoint of connection) {
      if (
        checker(
          existingPoint.startPoint,
          existingPoint.endPoint,
          newPoint,
          prevPoint
        )
      ) {
        return false;
      }
    }
    return true;
  };

  const handleClick = (event) => {
    if (event.button === 0) {
      // Check if left mouse button is clicked
      const { clientX, clientY } = event;
      let newPoint = { x: clientX, y: clientY - 72 };
      console.log(newPoint);
      for (const existingPoint of coordinatesArray) {
        //console.log(existingPoint);
        if (distance(existingPoint, newPoint) < 20) {
          // Adjust the distance threshold as needed
          newPoint.x = existingPoint.x;
          newPoint.y = existingPoint.y + 500;

          break;
        }
      }
      var flag = 1;
      for (const givenPoint of coordinatesArray) {
        if (comp(newPoint, givenPoint)) {
          flag = 0;
        }
      }
      if (flag) {
        alert("wrong move");
        return;
      }
      // Check if new point is close to any existing point
      if (checkfunc(newPoint)) {
        setnewgrid((prevnewgrid) => [...prevnewgrid, newPoint]);
      } else {
        alert("Wrong Move");
      }
    }
  };

  return (
    <React.Fragment>
      <div
        onClick={handleClick}
        style={{ height: "300vh", position: "relative" }}
      >
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }}
        >
          {coordinatesArray.map((coordinate, index) => (
            <circle
              key={index}
              cx={coordinate.x}
              cy={coordinate.y}
              r="10"
              fill="red"
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
    </React.Fragment>
  );
};
export default Drawpoints;
