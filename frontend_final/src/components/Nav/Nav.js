import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { getAllMobilePhone, createMobilePhone, deleteMobilePhone } from "../../Services/mobileService";

function Nav(props) {
  const [mobile, setMobile] = useState([]);

  useEffect(() => {
    getAllMB();
    createMB();
  }, []);


  const handleClickDelete = () => {
    deleteMB();
    console.log("Clicked!")
  }

  const getAllMB = async () => {
    let response = await getAllMobilePhone();
    setMobile(response.DT);
  };

  const createMB = async () => {
    await createMobilePhone({
      MaMB: '22',
      nameMB: 'Nguyen MB',
    });
  }

  const deleteMB = async () => {
    await deleteMobilePhone('22');
  }

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
      <button onClick={() => handleClickDelete()}>DELETE</button>

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
