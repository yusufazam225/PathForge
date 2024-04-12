import React from 'react';

const LineBetweenPoints = ({ x1, y1, x2, y2 }) => {
  return (
    <svg width="100%" height="100%">
      <line x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: 'black', strokeWidth: 2 }} />
    </svg>
  );
};

export default LineBetweenPoints;
