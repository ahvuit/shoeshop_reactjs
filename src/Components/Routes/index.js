import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../../pages/User/Home";
import Profile from "../../pages/Common/Profile";
import Login from "../../pages/Common/Login";
import Register from "../../pages/Common/Register";
import NotFound from "../../pages/Common/404";
import ProductOfType from "../../pages/User/ProductOfType.jsx";
import ProductDetail from "../../pages/User/ProductDetail";
import OrderByUser from "../../pages/User/OrderByUser";
import Contact from "../../pages/User/Contact";
import LayoutUser from "../../pages/User/LayoutUser";

import Products from "../../pages/Admin/Product";
import Orders from "../Admin/Order/Orders";
import Categories from "../../pages/Admin/Category";
import Brands from "../../pages/Admin/Brand";
import Customers from "../Admin/User/Customers";
import Employees from "../Admin/User/Employees";
import SizeTables from "../../pages/Admin/SizeTable";
import Sales from "../../pages/Admin/Sale";
import SaleDetails from "../Admin/SaleDetails/SaleDetails";
import Statistical from "../../pages/Admin/Statistical";
import LayoutAdmin from "../../pages/Admin/LayoutAdmin";

import React from "react";
import { useSelector } from "react-redux";

function AppRoutes() {
  const { user: currentUser } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="/404" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<LayoutUser />}>
        <Route path="" element={<Home />} />
        <Route path="/new/:categoryId" element={<ProductOfType />}></Route>
        <Route path="/brand/:categoryId" element={<ProductOfType />}></Route>
        <Route path="/cate/:categoryId" element={<ProductOfType />}></Route>
        <Route path="/sale/:categoryId" element={<ProductOfType />}></Route>
        <Route path="/product/:productId" element={<ProductDetail />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        {currentUser ? (
          <>
            <Route path="profile" element={<Profile />} />
            <Route path="/order/:userId" element={<OrderByUser />}></Route>
          </>
        ) : (
          ""
        )}
      </Route>
      {currentUser?.utype !== "USR" && currentUser ? (
        <Route path="/admin/" element={<LayoutAdmin />}>
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="sizetable" element={<SizeTables />} />
          {currentUser?.utype === "ADM" ? (
            <>
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="brands" element={<Brands />} />
              <Route path="customers" element={<Customers />} />
              <Route path="employees" element={<Employees />} />
              <Route path="sales" element={<Sales />} />
              <Route path="statistical" element={<Statistical />} />
              <Route path="sale-products" element={<SaleDetails />} />
            </>
          ) : (
            ""
          )}
        </Route>
      ) : (
        ""
      )}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
export default AppRoutes;
