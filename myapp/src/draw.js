import React, { useState } from "react";
import LineBetweenPoints from "./Linebwtwopoints";

function Draw(){
    const points=[[300,400],[4000,2000]];
    const [stp,setstp]=useState('0');
    const [endp,setendp]=useState('0');
    
   
   

    return <React.Fragment>
       <div>
      
       
     
      {points.map((pair, index) => (
        
        <div key={index}> {console.log(stp,endp,pair[0],pair[1])}
        
        <LineBetweenPoints x1={parseInt(stp)} y1={parseInt(endp)} x2={pair[0]} y2={pair[1]} />
        
        
        
        
        </div>
        
      ))}

    </div>
    </React.Fragment>
}
export default Draw; 