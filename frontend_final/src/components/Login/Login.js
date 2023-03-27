import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCustomerList,
  getCustomerLogin,
} from "../../Services/customerService";

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [customerInfor, setCustomerInfor] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    let data = await getCustomerLogin();
    let dataLogin = data.DT;
    let flag = false;
    
    await dataLogin.forEach((element) => {
      if (
        element.PHONE_NUMBER == phoneNumber &&
        element.CUSTOMER_PASSWORD == password &&
        element.IS_VALID == true
      ) {
        flag = true;
      }
    });

    if (flag) {
      console.log("Checkkkk =>>>");
      navigate("/");
    } else {
      console.log("LOGIN FAILED");
    }
  };

  return (
    <>
      <input
        placeholder="Nhập số điện thoại hoặc email"
        value={phoneNumber}
        type="number"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        placeholder="Nhập mật khẩu"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleLogin()}>Sign in</button>
    </>
  );
};

export default Login;
