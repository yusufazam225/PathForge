// PaintbrushCursor.js

import React, { useState, useEffect } from "react";
import "./App.css"; // Import CSS for styling

const PaintbrushCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", updatePosition);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return (
    <div
      className="neon-cursor"
      style={{ left: position.x, top: position.y }}
    ></div>
  );
};

export default PaintbrushCursor;
