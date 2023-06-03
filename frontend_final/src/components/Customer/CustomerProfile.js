import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CustomerProfile.css";
import { BiEdit } from "react-icons/bi";
import { getInforByEmailCus, changePass } from "../../Services/customerService";
import Footer from "../Footer/Footer";
import { toast } from "react-toastify";

function CustomerProfile(props) {
  const [isChangePass, setChangePass] = useState(false);
  const [userInfor, setUserInfor] = useState([]);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [dob, setdob] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [dateJoin, setdateJoin] = useState("");
  const [pass, setpass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");

  const dataEmail = sessionStorage.getItem("account");
  const emailJson = JSON.parse(dataEmail).email;

  const handleChangePasstogge = () => {
    let flag = !isChangePass;
    setChangePass(flag);
  };

  const handleGetCustomerInfor = async () => {
    console.log(emailJson);
    let data = await getInforByEmailCus(emailJson);
    if (data) {
      setUserInfor(data.DT[0]);
    }
    console.log(userInfor);
  };

  const handleChangePass = async (e) => {
    e.preventDefault();

    if (pass == "") {
      toast.error("Vui lòng nhập mật khẩu");
    } else if (confirmPass == "") {
      toast.error("Vui lòng xác nhận mật khẩu");
    } else {
      toast.success("Đổi mật khẩu thành công!");
      let data = await changePass(emailJson, pass);
      handleChangePasstogge();
    }
  };
  useEffect(() => {
    handleGetCustomerInfor();
  }, []);

  return (
    <>
      <div className="customer_profile_container">
        <div className="customer_profile">
          <div className="profile_image">
            Xin chào {userInfor.CUSTOMER_NAME}!
            <p className="profile_image_desc">
              Chúc bạn có các trải nghiệm tuyệt vời!
            </p>
          </div>
          <div className="image_name_user">N</div>
        </div>
        <div className="customer_infor row">
          <form>
            <div className="user_name_conainer">
              <h1 className="h3 mb-3 login_heading no-margin_bot ">
                {userInfor.CUSTOMER_NAME}
              </h1>
              <h1 className="user_name_email no-margin_bot ">
                {userInfor.EMAIL}
              </h1>
            </div>
            <div className="input_customer_profile_infor">
              <div className="input_customer_profile_infor_subcontainer row">
                <div className="input_infor_customer col col-4">
                  <label>Tên</label>
                  <input
                    placeholder="Tên"
                    value={userInfor.CUSTOMER_NAME}
                    className=" profile_customer_input_infor"
                    type="mail"
                    //   onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <BiEdit className="edit_btn" />
                </div>
                <div className="input_infor_customer col col-4">
                  <label>Số điện thoại</label>
                  <input
                    placeholder="Số điện thoại"
                    value={userInfor.PHONE_NUMBER}
                    className=" profile_customer_input_infor"
                    type="mail"
                    //   onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="input_infor_customer col col-4">
                  <label>Ngày tạo tài khoản</label>
                  <input
                    placeholder="Ngày tham gia"
                    value={userInfor.dateJoin}
                    className=" profile_customer_input_infor"
                    type="mail"
                    //   onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="input_infor_customer col col-8">
                  <label>Email</label>
                  <input
                    placeholder="Email"
                    value={userInfor.EMAIL}
                    className=" profile_customer_input_infor"
                    type="mail"
                    //   onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="input_infor_customer col col-4">
                  <label>Ngày sinh</label>
                  <input
                    placeholder="ngày sinh"
                    value={userInfor.DATE_OF_BIRTH}
                    className=" profile_customer_input_infor"
                    type="mail"
                    //   onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <BiEdit className="edit_btn" />
                </div>
                <div className="input_infor_customer col col-12">
                  <label>Địa chỉ</label>
                  <input
                    placeholder="địa chỉ"
                    value={userInfor.cusAddress}
                    className=" profile_customer_input_infor"
                    type="mail"
                    //   onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <BiEdit className="edit_btn" />
                </div>
                <p className="change_password" onClick={handleChangePasstogge}>
                  Bạn muốn đổi mật khẩu?
                </p>
                {isChangePass && (
                  <>
                    <div className="input_infor_customer col col-6">
                      <label>Mật khẩu mới</label>
                      <input
                        placeholder="mật khẩu mới"
                        value={pass}
                        className=" profile_customer_input_infor"
                        type="password"
                        onChange={(e) => setpass(e.target.value)}
                      />
                      <BiEdit className="edit_btn" />
                    </div>
                    <div className="input_infor_customer col col-6">
                      <label>Xác nhận mật khẩu</label>
                      <input
                        placeholder="xác nhận mật khẩu"
                        value={confirmPass}
                        className=" profile_customer_input_infor"
                        type="password"
                        onChange={(e) => setconfirmPass(e.target.value)}
                      />
                      <BiEdit className="edit_btn" />
                    </div>
                  </>
                )}
              </div>
              <button
                className="sign-btn update_infor_customer"
                onClick={(e) => handleChangePass(e)}
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CustomerProfile;
