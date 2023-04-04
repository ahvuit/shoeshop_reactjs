import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../../pages/Home";
import Profile from "../user/Profile";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import NotFound from "../../pages/404";
import ProductOfType from "../../pages/ProductOfType.jsx";
import ProductDetail from "../user/ProductDetail";
import OrderByUser from "../../pages/OrderByUser";
import Contact from "../user/Contact";
import LayoutUser from "../layouts/LayoutUser";

import Products from "../admin/Products";
import Orders from "../admin/Orders";
import Categories from "../admin/Categories";
import Brands from "../admin/Brands";
import Customers from "../admin/Customers";
import Employees from "../admin/Employees";
import SizeTables from "../admin/SizeTables";
import Sales from "../admin/Sales";
import SaleDetails from "../admin/SaleDetails";
import Statistical from "../admin/Statistical";
import LayoutAdmin from "../layouts/layoutAdmin/LayoutAdmin";

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
        <Route path="/cate/:categoryId" element={<ProductOfType />}></Route>
        <Route path="/sale/:categoryId" element={<ProductOfType />}></Route>
        <Route path="/product/:productId" element={<ProductDetail />}></Route>
        <Route path="/order/:userId" element={<OrderByUser />}></Route>
        <Route path="contact" element={<Contact />}></Route>
      </Route>
      <Route path="/admin/" element={<LayoutAdmin />}>
        <Route path="profile" element={<Profile />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="categories" element={<Categories />} />
        <Route path="brands" element={<Brands />} />
        <Route path="customers" element={<Customers />} />
        <Route path="employees" element={<Employees />} />
        <Route path="sizetable" element={<SizeTables />} />
        <Route path="sales" element={<Sales />} />
        <Route path="statistical" element={<Statistical />} />
        <Route path="sale-products" element={<SaleDetails />} />
      </Route>
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
export default AppRoutes;
