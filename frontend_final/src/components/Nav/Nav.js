import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
    <div>
      <header>
        <Link to="/" className="logo">
          <i className="ri-home-fill"></i>
          <img className="logo" src={logo} />
        </Link>

        <ul className="navbar">
          <li>
            <Link to="/mobile">Điện Thoại</Link>
          </li>
          <li>
            <Link to="/tablet">Tablet</Link>
          </li>
          <li>
            <Link to="/watch">Đồng hồ</Link>
          </li>
          <li>
            <Link to="/sound">Âm thanh</Link>
          </li>
          <li>
            <Link to="/accessories">Phụ kiện</Link>
          </li>
          <li>
            <Link to="/promotion">Khuyến mãi</Link>
          </li>
        </ul>

        <div className="main">
          <a href="">
            <AiOutlineSearch />
          </a>

          <Link to="/cart" className="Cart">
            <AiOutlineShoppingCart />
          </Link>
          <div className="User">
            <Link to={!data && "/login"} className="user-option">
              <AiOutlineUser />
            </Link>
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
    </div>
  );
};

export default Nav;
