import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { getAllMobilePhone } from "../../Services/mobileService";

function Nav(props) {
  const [mobile, setMobile] = useState([]);

  useEffect(() => {
    getAllMB();
  }, []);

  const getAllMB = async () => {
    let response = await getAllMobilePhone();
    setMobile(response.DT);
  };

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

      <ul>
        {mobile.map((item, index) => {
          return (
            <>
              <li key={index}>
                {item.nameMB} - {item.MaMB}
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default Nav;
