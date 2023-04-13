
import { NavLink } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import './Nav.css'


const Nav = (props) => {
  return (
    <header>
      <NavLink to="/" className="logo">
        <i className="ri-home-fill"></i>
        <span>logo</span>
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

        <a href="" className="Cart">
          <AiOutlineShoppingCart />
        </a>
        <a href="" className="User">
          <AiOutlineUser />
        </a>
        <div className="bx bx-menu" id="menu-icon"></div>
      </div>
    </header>
  );
};

export default Nav;
