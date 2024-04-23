import React,{useState} from 'react';
import UserContext from './UserContext';
const UserContextProvider=({children})=>{
    const [userinfo,setuserinfo]=useState(null);
    return (
        <UserContext.Provider value={{userinfo,setuserinfo}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;