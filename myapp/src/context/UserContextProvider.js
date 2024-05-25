import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [userinfo, setuserinfo] = useState(null);
  const [token, settoken] = useState(null);
  return (
    <UserContext.Provider value={{ userinfo, setuserinfo, token, settoken }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
