import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { getAllMobilePhone, createMobilePhone, deleteMobilePhone } from "../../Services/mobileService";

function Nav(props) {

  return (
    <div>
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/new">
        News
      </Link>
      <Link className="nav-link" to="/about">
        about
      </Link>
      <Link className="nav-link" to="/services">
        services
      </Link>
      <Link to="/user_profile">USER</Link>
    </div>
  );
}

export default Nav;
