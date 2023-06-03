import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import "./Nav.css";
import { BsBoxSeam, BsSearch, BsArrowRightShort, BsDot } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { FaTimesCircle } from "react-icons/fa";
import { getAllMobilePhone } from "../../Services/mobileService";
import logo from "./log_10diem.png";

const Nav = (props) => {
  const navigate = useNavigate();
  let sessionData = sessionStorage.getItem("account");
  let data = JSON.parse(sessionData);
  let charName = "";

  const [showSearchFeed, setShowSearch] = useState(false);
  const [query, setquery] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [product, setProduct] = useState([]);
  const [result, setResult] = useState({});

  const emailCus = sessionStorage.getItem("account");
  const emaiLSJON = JSON.parse(emailCus);

  if (emailCus && emaiLSJON) {
    charName = emaiLSJON.email.charAt(0);
  }

  const fetchProduct = async () => {
    let data = await getAllMobilePhone();
    if (data && +data.EC == 1) {
      setProduct(data.DT);
      console.log(product);
    }
  };

  useEffect(() => {
    if (showSearchFeed) {
      fetchProduct();
    }
  }, [showSearchFeed]);
  const handleSearchRe = () => {
    const foundItem = product.find((item) => item.product_name === searchItem);
    return foundItem ? foundItem : null;
  };

  useEffect(() => {
    const foundData = handleSearchRe();
    console.log("data ne", foundData);
    setResult(foundData);
  }, [searchItem]);

  const handleSignOut = () => {
    if (emailCus && emaiLSJON != "") {
      sessionStorage.removeItem("account");
      location.href = "http://localhost:3000/";
    } else {
      navigate("/login");
    }
  };

  const handleShowSeachFeed = () => {
    let flag = !showSearchFeed;
    setShowSearch(flag);
  };

  const handleSearchHP = () => {
    handleShowSeachFeed;
  };

  return (
    <div className="navigation_container">
      <header>
        <Link to="/" className="logo_brand_GROUP navbar">
          <img src={logo} />
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
          <a onClick={() => handleShowSeachFeed()}>
            <AiOutlineSearch className="search_icon" />
          </a>
          {showSearchFeed && (
            <div className="option-hover-user search_feed_container">
              <div className="input_search_product">
                <BsSearch className="search_icon search_icon_large" />
                <input
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  placeholder="Tìm kiếm trên Yourmobile.com"
                  autoFocus
                />
                <FaTimesCircle
                  className="search_icon_times"
                  onClick={() => handleShowSeachFeed()}
                />
              </div>
              <div className="search_feed_product">
                {result && (
                  <Link
                    to={`/product_detail/${result.id_product}`}
                    className="search_feed_product_name"
                    key={result.id_product}
                    onClick={handleShowSeachFeed}
                  >
                    <BsArrowRightShort className="search_feed_produc_name_arrow--icon" />
                    {result.product_name}
                  </Link>
                )}
              </div>
            </div>
          )}

          <Link to="/cart" className="Cart">
            <AiOutlineShoppingCart />
            <span className="cart_quantity">{props.cart}</span>
          </Link>
          <div className="User">
            {emailCus && emaiLSJON != "" ? (
              <div className="user_name_char_container">
                <p>{charName}</p>
              </div>
            ) : (
              <Link className="user-option">
                <AiOutlineUser />
              </Link>
            )}

            <div className="option-hover-user">
              <h4 className="option-hover-user_heading">
                Xin chào{" "}
                <span>
                  {emailCus && emaiLSJON != ""
                    ? emaiLSJON.email
                    : " Bạn chưa đăng nhập"}
                  !
                </span>
              </h4>
              <p className="option_hover_user_profile">Hồ sơ của tôi</p>
              <Link to="/customer/order" className="hover_user_profile_btn">
                <BsBoxSeam className="user_hove_profile_icon" />
                Đơn hàng
              </Link>
              {data && (
                <Link to="/customer/profile" className="hover_user_profile_btn">
                  <CiSettings className="user_hove_profile_icon" />
                  Tài khoản
                </Link>
              )}

              <Link
                onClick={data && handleSignOut}
                to={!data && "/login"}
                className="hover_user_profile_btn"
              >
                <AiOutlineUser className="user_hove_profile_icon" />
                {emailCus && emaiLSJON != "" ? "Đăng xuất" : "Đăng nhập"}
              </Link>
            </div>
          </div>

          <div className="bx bx-menu" id="menu-icon"></div>
        </div>
      </header>
    </div>
  );
};

export default Nav;
