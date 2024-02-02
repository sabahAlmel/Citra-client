import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.js";
import AddProduct from "../components/AddProduct/AddProduct.js";
import AddressForm from "../../src/components/AddressForm/AddressForm.js"
import Products from "../pages/Dashboard/Products/Products.js";
import Users from "../pages/Dashboard/Users/Users.js";
import OverView from "../pages/Dashboard/OverView/OverView.js";
import Order from "../pages/Dashboard/Orders/Order.js";
import SignIn from "../pages/SignIn/SignIn.js";
import SignUp from "../pages/SignUp/SignUp.js";
import Shop from "../pages/Shop/Shop.js";
import UserOutlet from "../Outlet/userOutlet.js";
import NotFound from "../pages/NotFound/NotFound.js";
import LayoutWithSidebar from "./LayoutWithSidebar.js";
import SingleProduct from "../pages/SingleProduct/SingleProduct";
import Cart from "../pages/cart/Cart.js";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword.js";
import ProtectedRoute from "./ProtectedRoute.js";
function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<UserOutlet />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/singleProduct/:slug" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/singleProduct" element={<SingleProduct />}></Route>
        <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
        <Route path="/orderform" element={<AddressForm />}></Route>
        <Route path="/test" element={<AddProduct />}></Route>
      </Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>

{/* protected route  */}
      <Route
        path="/products"
        element={
          <ProtectedRoute>

       
            <LayoutWithSidebar>
              <Products />
            </LayoutWithSidebar>
             </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <LayoutWithSidebar>
              {" "}
              <Users />
            </LayoutWithSidebar>
            </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/overview"
        element={
          
            <LayoutWithSidebar>
              {" "}
              <OverView />
            </LayoutWithSidebar>
           
        }
      ></Route>
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <LayoutWithSidebar>
              {" "}
              <Order />
            </LayoutWithSidebar>
             </ProtectedRoute>
        }
      ></Route>

      <Route path="/*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default AppRoutes;
