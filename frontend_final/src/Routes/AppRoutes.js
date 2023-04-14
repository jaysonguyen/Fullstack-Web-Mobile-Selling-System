import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import React from "react";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import HomePage from "../components/HomePage/HomePage";
import User_Profile from "../components/User_Profile/User_Profile";

import ProductDetail from "../components/ProductDetail/ProductDetail";
import ProductList from "../components/ProductList/ProductList";

import Mobile from "../components/Product/Mobile/Mobile";
import Cart from "../components/Cart/Cart";
import Nav from "../components/Nav/Nav";

const AppRoutes = (props) => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/user_profile" element={<User_Profile />} />

        <Route exact path="/product_detail/:id" element={<ProductDetail />} />
        <Route exact path="/mobile" element={<ProductList />} />

        <Route exact path="/cart" element={<Cart />} />

        <Route path="*">404 Not Found</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
