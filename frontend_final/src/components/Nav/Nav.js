import React from "react";
import { Link, NavLink, json, useNavigate } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import "./Nav.css";
import logo from "./logonew.png";

const Nav = (props) => {
  const navigate = useNavigate();
  let sessionData = sessionStorage.getItem("account");
  let data = JSON.parse(sessionData);

  const handleSignOut = () => {
    sessionStorage.removeItem("account");
    navigate("/login");
  };

  return (
    <header>
      <NavLink to="/" className="logo">
        <i className="ri-home-fill"></i>
        <img className="logo" src={logo}/>
      </NavLink>

      <ul className="navbar">
        <li>
          <NavLink to="/mobile">Điện Thoại</NavLink>
        </li>
        <li>
          <NavLink to="/tablet">Tablet</NavLink>
        </li>
        <li>
          <NavLink to="/watch">Đồng hồ</NavLink>
        </li>
        <li>
          <NavLink to="/sound">Âm thanh</NavLink>
        </li>
        <li>
          <NavLink to="/accessories">Phụ kiện</NavLink>
        </li>
        <li>
          <NavLink to="/promotion">Khuyến mãi</NavLink>
        </li>
      </ul>

      <div className="main">
        <a href="">
          <AiOutlineSearch />
        </a>

        <NavLink to="/cart" className="Cart">
          <AiOutlineShoppingCart />
        </NavLink>
        <div className="User">
          <NavLink to={!data && "/login"} className="user-option">
            <AiOutlineUser />
          </NavLink>
          {data && (
            <div className="option-hover-user">
              <button>Tài khoản</button>
              <button>Đơn hàng</button>
              <button onClick={() => handleSignOut()}>Đăng xuất</button>
            </div>
          )}
        </div>

        <div className="bx bx-menu" id="menu-icon"></div>
      </div>
    </header>
  );
};

export default Nav;
