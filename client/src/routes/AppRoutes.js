import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.js";
import Dashboard from "../pages/Dashboard/Dashboard.js";
import SignIn from "../pages/SignIn/SignIn.js";
import SingUp from "../pages/SignUp/SignUp.js";
import Shop from "../pages/Shop/Shop.js";
import SignUp from "../pages/SignUp/SignUp.js";
import UserOutlet from "../Outlet/userOutlet.js";
import NotFound from "../pages/NotFound/NotFound.js";
import SingleProduct from "../pages/SingleProduct/SingleProduct.js";
function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<UserOutlet />}>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/singleProduct" element={<SingleProduct />}></Route>
      </Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default AppRoutes;
