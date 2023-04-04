import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import {
  getAllMobilePhone,
  createMobilePhone,
  deleteMobilePhone,
} from "../../Services/mobileService";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const Nav = (props) => {

  // useEffect(() => {
  //   getAllMB();
  //   createMB();
  // }, []);

  const handleClickDelete = () => {
    deleteMB();
  };

  const getAllMB = async () => {
    let response = await getAllMobilePhone();
  };

  const createMB = async () => {
    await createMobilePhone({
      MaMB: "22",
      nameMB: "Nguyen MB",
    });
  };

  const deleteMB = async () => {
    await deleteMobilePhone("22");
  };

  return (
    <header>
      <Link href="/" class="logo">
        <i class="ri-home-fill"></i>
        <span>logo</span>
      </Link>

      <ul class="navbar">
        <li>
          <Link href="">Điện Thoại</Link>
        </li>
        <li>
          <Link href="">Tablet</Link>
        </li>
        <li>
          <Link href="">Đồng hồ</Link>
        </li>
        <li>
          <Link href="">Âm thanh</Link>
        </li>
        <li>
          <Link href="">Phụ kiện</Link>
        </li>
        <li>
          <Link href="">Khuyến mãi</Link>
        </li>
      </ul>

      <div class="main">
        <Link href="">
          <AiOutlineSearch />
        </Link>

        <Link href="" class="Cart">
          <AiOutlineShoppingCart />
        </Link>
        <Link href="" class="User">
          <AiOutlineUser />
        </Link>
        <div className="bx bx-menu" id="menu-icon"></div>
      </div>
    </header>
  );
};

export default Nav;
