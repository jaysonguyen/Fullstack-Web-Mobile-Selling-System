import "./Sidebar.css";
import "../Home.css";
import SidebarMenu from "./SidebarMenu.js";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch, BiCategory } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import OrderManage from "../OrderManage/OrderManage";
const routes = [
  {
    path: "/admin",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/admin/users",
    name: "Users",
    icon: <FaUser />,
  },
  {
    path: "/admin/ordermanage",
    name: "Quản lí đơn hàng",
    icon: <BsCartCheck />,
  },
  {
    path: "/admin/analytics",
    name: "Phân tích nhu cầu cách hàng",
    icon: <BiAnalyse />,
  },
  {
    path: "/admin/file-manager",
    name: "Quản lý sản phẩm",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/admin/production",
        name: "Sản phẩm ",
        icon: <MdOutlineProductionQuantityLimits />,
      },
      {
        path: "/admin/settings/2fa",
        name: "Loại sản phẩm",
        icon: <BiCategory />,
      },
    ],
  },
  {
    path: "/admin/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/admin/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/admin/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/admin/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/admin/saved",
    name: "Saved",
    icon: <AiFillHeart />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "260px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  DoSomeCoding
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>
        {/* <OrderManage/> */}
        {/* <main>{children}</main> */}
      </div>
    </>
  );
};

export default SideBar;
