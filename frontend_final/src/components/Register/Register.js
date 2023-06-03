import React, { useState } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPhoneNumber } from "firebase/auth";
import { BiChevronLeftCircle } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { registerNewUser } from "../../Services/customerService";
import OTPInput, { ResendOTP } from "otp-input-react";
import "../Login/Login.css";
import "./Register.css";
import { toast } from "react-toastify";

const Register = (props) => {
  const [userName, setUserName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [otp, setOpt] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const defaultValidInput = {
    isValidEmail: true,
    isValidPhoneNumber: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };

  const [objectCheckValid, setObjCheckValid] = useState(defaultValidInput);

  const isValidInputs = () => {
    if (!email) {
      setObjCheckValid({ ...defaultValidInput, isValidEmail: false });
      toast.error("Vui lòng nhập email");
      return false;
    }

    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      setObjCheckValid({ ...defaultValidInput, isValidEmail: false });
      toast.error("Địa chỉ email không đúng");
      return false;
    }
    if (!phone) {
      setObjCheckValid({ ...defaultValidInput, isValidPhoneNumber: false });
      toast.error("Vui lòng nhập số điện thoại");
      return false;
    }
    if (!password) {
      setObjCheckValid({ ...defaultValidInput, isValidPassword: false });
      toast.error("Vui lòng nhập mật khẩu");
      return false;
    }
    if (password !== ConfirmPassword) {
      setObjCheckValid({ ...defaultValidInput, isValidConfirmPassword: false });
      toast.error("Mật khẩu không trùng khớp");
      return false;
    }

    return true;
  };

  const navigate = useNavigate();

  const onCaptchVertify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignUp();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  const onSignUp = () => {
    setLoading(true);
    try {
      onCaptchVertify();

      const appVerifier = window.recaptchaVerifier;
      const formatPh = "+84" + phone;

      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          toast.success("Đã gửi mã OTP");
          setLoading(false);
          setShowOtp(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      toast.error(
        "Số điện thoại không tồn tại hoặc nhập sai vui lòng kiểm tra"
      );
    }
  };

  const onClickRegister = (e) => {
    e.preventDefault();
    let check = isValidInputs();
    if (check == true) {
      onSignUp();
    }
  };

  const handleGoBack = () => {
    const flag = !showOtp;
    setShowOtp(flag);
  };

  // OTP CONFIRM
  const onOtpVerify = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      window.confirmationResult
        .confirm(otp)
        .then(async (res) => {
          console.log(res);
          setUser(res.user);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      if (user) {
        const data = await registerNewUser(
          userName,
          phone,
          dob,
          password,
          email,
          address
        );
        if (data && +data.EC == 1) {
          toast.success("Đăng ký thành công");
          navigate("/login");
        }
        if (data && +data.EC != 1) {
          toast.error(data.EC);
        }
      }
    } catch (error) {
      toast.error("Sai mã OTP vui lòng nhập lại");
    }
  };

  return (
    <div className="">
      <div id="recaptcha-container"></div>
      <main className="form-signin">
        {!showOtp && (
          <form>
            <h1 className="h3 no_margin login_heading">Tạo tài khoản</h1>
            <p className="login_heading_desc">
              Tạo tài khoản để có thể nâng cao trả nghiệm sử dụng dịch vụ của
              chúng tôi
            </p>
            <div className="input_container">
              <label>Số điện thoại</label>
              <input
                placeholder="Số điện thoại"
                value={phone}
                name="phone"
                className={
                  objectCheckValid.isValidEmail
                    ? "input_login_container"
                    : "input_login_container is-invalid"
                }
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <label>Email</label>
              <input
                placeholder="Email"
                value={email}
                type="email "
                className="input_login_container"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Họ và tên</label>
              <input
                placeholder="Họ và tên"
                value={userName}
                className="input_login_container"
                onChange={(e) => setUserName(e.target.value)}
              />
              <label>Ngày sinh</label>
              <input
                value={dob}
                type="date"
                className="input_login_container"
                onChange={(e) => setDob(e.target.value)}
              />
              <label>Địa chỉ</label>
              <input
                value={address}
                placeholder="Địa chỉ"
                className="input_login_container"
                onChange={(e) => setAddress(e.target.value)}
              />
              <label>Mật khẩu</label>
              <input
                placeholder="Mật khẩu"
                value={password}
                type="password"
                className="input_login_container"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Xác nhận Mật khẩu</label>
              <input
                placeholder="Xác nhận Mật khẩu"
                value={ConfirmPassword}
                type="password"
                className="input_login_container"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="submit"
                className="sign-btn"
                onClick={(e) => onClickRegister(e)}
              >
                {loading && (
                  <AiOutlineLoading3Quarters
                    size={14}
                    className="animate-spin"
                  />
                )}
                Đăng ký
              </button>
              <h6 className="have-account-btn">
                Bạn đã có tài khoản?
                <Link to="/login">Đăng nhập ngay</Link>
              </h6>
            </div>
          </form>
        )}

        {showOtp && (
          <div className="otp-container">
            {/* <button className="go-back-btn" onClick={handleGoBack}>
              <BiChevronLeftCircle />
            </button> */}
            <h3 className="login_heading">Xác nhận đăng ký</h3>
            <h5 className="otp-number">
              Nhập mã OTP được gửi qua số điện thoại
            </h5>
            <OTPInput
              OTPLength={6}
              disabled={false}
              otpType="number"
              autoFocus
              onChange={setOpt}
              value={otp}
            ></OTPInput>
            <button
              className="sign-btn otp_signBTn"
              onClick={(e) => {
                onOtpVerify(e);
              }}
            >
              <span>Gửi</span>
              {loading && (
                <AiOutlineLoading3Quarters size={14} className="animate-spin" />
              )}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Register;
