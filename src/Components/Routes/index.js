import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profile from "../user/Profile";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ProductOfType from "../../pages/ProductOfType.jsx";
import ProductDetail from "../user/ProductDetail";

import React from 'react';

function AppRoutes() {

  
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      
      <Route path="/profile" element={<Profile />}></Route>
      
        <Route path="/new/:categoryId" element={<ProductOfType/>}></Route>
        <Route path="/brand/:categoryId" element={<ProductOfType />}></Route>
        <Route path="/sale/:categoryId" element={<ProductOfType />}></Route>
        <Route path="/product/:productId" element={<ProductDetail />}></Route>
        {/* <Route> 404 Not Found!</Route> */}
        

      

    </Routes>
  );
}
export default AppRoutes;
