import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkInforCusomter } from "../../Services/customerService";
import "./Login.css";
import { toast } from "react-toastify";

const Login = (props) => {
  const [email, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };

  const [checkObjValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      if (!email) {
        toast.error("Vui lòng nhập tài khoản đăng nhập");
        setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
        return;
      }
      if (!password) {
        toast.error("Vui lòng nhập mật khẩu");
        setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
        return;
      }


      let response = await checkInforCusomter(email, password);
      if (response && +response.EC === 1) {
        let data = {
          email: email,
        };
        sessionStorage.setItem("account", JSON.stringify(data));
        toast.success(response.EM);
        navigate("/");
        return;
      }

      if (response && +response.EC !== 0) {
        toast.error(response.EM);
        return;
      }
    } catch (error) {
      // Handle any errors thrown during the await call
      console.error(error);
    }
  };

  return (
    <>
      <div className="login_container">
        <h1 className="login_container_heading">
          Đăng nhập để thanh toán nhanh hơn.
        </h1>
        <main className="form-signin">
          <form>
            <h1 className="h3 mb-3 login_heading">Đăng nhập</h1>
            <div className="input_container">
              <input
                placeholder="Nhập số điện thoại hoặc email"
                value={email}
                className="input_login_container"
                type="mail"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <input
                placeholder="Nhập mật khẩu"
                value={password}
                type="password"
                className="input_login_container"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="sign-btn" onClick={(e) => handleLogin(e)}>
              Đăng nhập
            </button>
            <Link className="forget_password_container" to="/register">
              {" "}
              Bạn đã quên mật khẩu?{" "}
            </Link>
            <p className="sign-up-link">
              Bạn chưa có tài khoản?{" "}
              <Link className="forget_password_container" to="/register">
                Đăng kí{" "}
              </Link>
            </p>
          </form>
        </main>
      </div>
    </>
  );
};

export default Login;
