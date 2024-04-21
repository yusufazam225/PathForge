
import React, { useState } from "react"
import { useLocation,useNavigate} from "react-router-dom";
const OTP=()=>{
    const [otp,setotp]=useState('');
    const {state}=useLocation();
    const {OTP,EMAIL}=state;
    const navigate=useNavigate();
    const checker=()=>{
        console.log(OTP);
        if(otp==OTP)
        {
            navigate('/register2',{state:{email:EMAIL}});
        }
        else{
            console.log('error');
        }
    }
return <React.Fragment>
    <div>
        <input value={otp} onChange={(e)=>setotp(e.target.value)}/>
        <button onClick={checker}>Enter</button>
    </div>
</React.Fragment>
}
export default OTP;