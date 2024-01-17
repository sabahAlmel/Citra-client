import React from "react";
import NavBar from "../layout/NavBar/NavBar"
import Footer from "../layout/Footer/Footer";
import { Outlet } from "react-router-dom";
// import Nav from "../layout/NavNew/NavNew";

function Container() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Container;
