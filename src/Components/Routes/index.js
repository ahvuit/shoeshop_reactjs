import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../../pages/Home";
import Profile from "../user/Profile";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import NotFound from "../../pages/404";
import ProductOfType from "../../pages/ProductOfType.jsx";
import ProductDetail from "../user/ProductDetail";
import OrderByUser from "../../pages/OrderByUser";
import LayoutUser from "../layouts/LayoutUser";

import React from "react";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/404" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<LayoutUser />}>
        <Route path="" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/new/:categoryId" element={<ProductOfType />}></Route>
        <Route path="/brand/:categoryId" element={<ProductOfType />}></Route>
        <Route path="/sale/:categoryId" element={<ProductOfType />}></Route>
        <Route path="/product/:productId" element={<ProductDetail />}></Route>
        <Route path="/order/:userId" element={<OrderByUser />}></Route>
      </Route>
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
export default AppRoutes;
