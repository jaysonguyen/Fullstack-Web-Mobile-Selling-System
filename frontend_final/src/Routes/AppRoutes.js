import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import React from "react";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import HomePage from "../components/HomePage/HomePage";
import User_Profile from "../components/User_Profile/User_Profile"

const AppRoutes = (props) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user_profile" element={<User_Profile/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
