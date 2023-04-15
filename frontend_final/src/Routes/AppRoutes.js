import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import React from "react";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import HomePage from "../components/HomePage/Homepage";
import User_Profile from "../components/User_Profile/User_Profile";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import ProductList from "../components/ProductList/ProductList";
import AdminPage from "../components/AdminPage/Home";
import SideBar from "../components/AdminPage/sidebar/Sidebar";
import Cart from "../components/Cart/Cart";
import Nav from "../components/Nav/Nav";
import OrderManage from "../components/AdminPage/OrderManage/OrderManage";
import AddProduct from "../components/AdminPage/Production/AddProduct";
import Production from "../components/AdminPage/Production/Production";

const AppRoutes = (props) => {
  const pathname = window.location.pathname;
  let flag = false;
  if (pathname == "/admin") {
    flag = true;
  }
  return (
    <BrowserRouter>
      
      {pathname.includes("/admin") ? "" : <Nav/>}
      {pathname.includes("/admin") ? <SideBar/> : ""}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/user_profile" element={<User_Profile />} />

        <Route exact path="/product_detail/:id" element={<ProductDetail />} />
        <Route exact path="/mobile" element={<ProductList />} />
        <Route exact path="/admin/ordermanage" element={<OrderManage />} />

        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/admin" element={<AdminPage />} />
        <Route exact path="/admin/product/add" element={<AddProduct />} />
        <Route exact path="/admin/production" element={<Production />} />

        <Route path="*">404 Not Found</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
