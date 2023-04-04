import React, { useState } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { signInWithPhoneNumber } from "firebase/auth";
import OTPInput, { ResendOTP } from "otp-input-react";
//import { registerNewUser } from "../../Services/customerService";

const Register = (props) => {
  const [userName, setUserName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [otp, setOpt] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [user, setUser] = useState(null);

  /*const onCaptchVertify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignUp();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        },
        auth
      );
    }
  };*/

  const onSignUp = () => {
    /*onCaptchVertify();
    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+84" + phone;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error);
      });*/
    customerInforRegister();
  };

  const handleGetOtp = () => {
    const flag = !showOtp;
    setShowOtp(flag);
    onSignUp();
  };

  // OTP CONFIRM
  /*const onOtpVerify = async () => {
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
      })
      .catch((error) => {
        console.log(error);
      });
    if (user) {
      console.log(userName, phone, dob, password, email);
      await customerInforRegister();
    }
  };*/

  const customerInforRegister = async () => {
    //await registerNewUser(userName, phone, dob, password, email);
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      {!showOtp && (
        <div>
          <label>Số điện thoại</label>
          <input
            placeholder="Số điện thoại"
            value={phone}
            type="tel"
            name="phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            placeholder="Email"
            value={email}
            type="email "
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Họ và tên</label>
          <input
            placeholder="Họ và tên"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label>Ngày sinh</label>
          <input
            value={dob}
            type="date"
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <label>Mật khẩu</label>
          <input
            placeholder="Mật khẩu"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Xác nhận Mật khẩu</label>
          <input
            placeholder="Xác nhận Mật khẩu"
            value={ConfirmPassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" onClick={() => handleGetOtp()}>
            Đăng ký
          </button>
        </div>
      )}

      {/* {showOtp && (
        <>
          <button onClick={() => handleGetOtp()}>Tro lai</button>
          <h1>Xác nhận đăng ký</h1>
          <h5>Nhập mã OTP được gửi qua số điện thoại</h5>
          <label htmlFor="ph">Enter your OTP</label>
          <OTPInput
            OTPLength={6}
            disabled={false}
            otpType="number"
            autoFocus
            onChange={setOpt}
            value={otp}
          ></OTPInput>
          <button onClick={() => onOtpVerify()}>submit</button>
        </>
      )} */}

      {showOtp && (
        <>
          <h1>REGISTER SUCCESSFULL</h1>
        </>
      )}
    </div>
  );
};

export default Register;
