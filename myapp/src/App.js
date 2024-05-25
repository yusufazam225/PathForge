import React from "react";
import { Outlet } from "react-router-dom";
import Draw from "./draw.js";
import "./App.css";

import Navbar from "./Navbar.js";
import UserContextProvider from "./context/UserContextProvider.js";

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Outlet />
    </UserContextProvider>
  );
}

export default App;
