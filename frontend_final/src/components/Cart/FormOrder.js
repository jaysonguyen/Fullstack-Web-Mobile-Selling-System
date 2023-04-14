import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import "./FormOrder.css";
import logoStore from "./img/logo.jpg";
import mb from "./img/mblogo.jpg";
import delivery from "./img/deliveryfast.png";
import { HiMinusSm } from "react-icons/hi";
import { FcCheckmark } from "react-icons/fc";
import { getInforByEmailCus } from "../../Services/customerService";

const FormOrder = (props) => {
  const [showComplete, setShowComplete] = useState(false);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");

  const sessionData = sessionStorage.getItem("account");
  const handleGetInforByEmail = async () => {
    if (sessionData) {
      const email = JSON.parse(sessionData).email;
      const checkEmail = await getInforByEmailCus(email);
      if (checkEmail && +checkEmail.EC === 1) {
        setname(checkEmail.DT[0].CUSTOMER_NAME);
        setphone(checkEmail.DT[0].PHONE_NUMBER);
        setaddress(checkEmail.DT[0].CUSTOMER_ADDRESS);
        setemail(checkEmail.DT[0].EMAIL);
      }
    }
  };

  useEffect(() => {
    handleGetInforByEmail();
  }, []);

  const handleCompletebtn = () => {
    let flag = !showComplete;
    setShowComplete(flag);
  };

  return (
    <div className="order_container_form">
      {!showComplete && (
        <Container fluid>
          <ul className="step_order">
            <li>
              <span className="success_icon">
                <FcCheckmark className="icon" style={{ color: "#000" }} />
              </span>
              Giỏ hàng
            </li>
            <li>
              {" "}
              <span>
                <HiMinusSm />
              </span>
              <span>
                <HiMinusSm />
              </span>
              <span>
                <HiMinusSm />
              </span>
            </li>
            <li>Thanh toán</li>
            <li>
              {" "}
              <span>
                <HiMinusSm />
              </span>
              <span>
                <HiMinusSm />
              </span>
              <span>
                <HiMinusSm />
              </span>
            </li>
            <li>Hoàn tất đặt hàng</li>
          </ul>
          <Row>
            <Col className="item_order" lg={6}>
              <h3 className="order_heading">Tóm tắt đơn đặt</h3>
              <p className="order_desc">
                Kiểm tra lại sản phẩm và chọn công ty vận chuyển phù hợp với bạn
              </p>

              <ul className="infor_product_body body_value_order border_around">
                <li className="infor_product_body infor_image order">
                  <img src="https://shopdunk.com/images/thumbs/0008734_iphone-14-pro-128gb_80.png" />
                </li>
                <li className="infor_product_body infor_name name_order">
                  <span>IPhone 14 Pro Max</span>
                  <div className="infor_product_order">
                    <span>Hình thức: Mua thẳng</span>
                    <span>Cấu hình: 256GB</span>
                    <span>Màu sắc: GOLD</span>
                  </div>
                </li>
                <li className="infor_product_body infor_price">
                  <p>
                    {" "}
                    29.000.000<span>&#8363;</span>
                  </p>
                </li>
              </ul>
              <ul className="infor_product_body body_value_order border_around">
                <li className="infor_product_body infor_image order">
                  <img src="https://shopdunk.com/images/thumbs/0008734_iphone-14-pro-128gb_80.png" />
                </li>
                <li className="infor_product_body infor_name name_order">
                  <span>IPhone 14 Pro Max</span>
                  <div className="infor_product_order">
                    <span>Hình thức: Mua thẳng</span>
                    <span>Cấu hình: 256GB</span>
                    <span>Màu sắc: GOLD</span>
                  </div>
                </li>
                <li className="infor_product_body infor_price">
                  <p>
                    {" "}
                    29.000.000<span>&#8363;</span>
                  </p>
                </li>
              </ul>
              <div className="shipping_method">
                <h3 className="order_heading method_receive">
                  Chọn phương thức thanh toán
                </h3>
                <div className="payment_method_container">
                  <ul className="infor_product_body body_value_order border_around payment_method_list">
                    <li className="infor_product_body infor_image order">
                      <img src={logoStore} />
                    </li>
                    <li className="infor_product_body infor_name name_order">
                      <span>Thanh toán tại cửa hàng</span>
                      <div className="infor_product_order">
                        <span>Thanh toán và nhận hàng tại cửa hàng</span>
                      </div>
                    </li>
                    <li className="infor_product_body infor_price">
                      <p></p>
                    </li>
                  </ul>
                  <ul className="infor_product_body body_value_order border_around payment_method_list">
                    <li className="infor_product_body infor_image order">
                      <img src={mb} />
                    </li>
                    <li className="infor_product_body infor_name name_order">
                      <span>Chuyển khoản</span>
                      <div className="infor_product_order">
                        <span>
                          Đơn hàng sẽ được xác nhận sau khi thanh toán thành
                          công
                        </span>
                      </div>
                    </li>
                    <li className="infor_product_body infor_price">
                      <p></p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="shipping_method">
                <h3 className="order_heading method_receive">
                  Chọn phương thức vận chuyển
                </h3>
                <div className="payment_method_container">
                  <ul className="infor_product_body body_value_order border_around payment_method_list">
                    <li className="infor_product_body infor_image order">
                      <img src={delivery} />
                    </li>
                    <li className="infor_product_body infor_name name_order">
                      <span>Vận chuyển nhanh</span>
                      <div className="infor_product_order">
                        <span>Thanh toán và nhận hàng tại cửa hàng</span>
                      </div>
                    </li>
                    <li className="infor_product_body infor_price">
                      <p></p>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col className="payment_detail" lg={6}>
              <h3 className="order_heading">Chi tiết thanh toán</h3>
              <p className="order_desc">
                Hoàn thành đơn đặt của bạn bằng việc cung cấp các thông tin sau
              </p>
              <div className="infor_order">
                <div className="infor_user_container">
                  <label>Tên</label>
                  <input value={name} className="name_user" placeholder="Tên" />
                  <label>Số điện thoại</label>
                  <input
                    value={phone}
                    disabled={phone ? "disabled" : ""}
                    className="phone_number"
                    placeholder="Số điện thoại"
                  />
                  <label>Email</label>
                  <input
                    value={email}
                    disabled={email ? "disabled" : ""}
                    className="email"
                    placeholder="Email"
                  />
                  <label>Địa chỉ</label>
                  <input
                    value={address}
                    className="address"
                    placeholder="Địa chỉ"
                  />
                </div>
                <div className="amount_container">
                  <p className="subTotal">
                    Tổng phụ:{" "}
                    <span className="total_price subTotal_price">
                      29.000.000<span>&#8363;</span>
                    </span>
                  </p>
                  <p>
                    Tổng cộng:{" "}
                    <span className="total_price">
                      29.000.000<span>&#8363;</span>
                    </span>
                  </p>
                </div>
                <div className="accept_rule">
                  <button
                    className="order_btn"
                    onClick={() => handleCompletebtn()}
                  >
                    Thanh toán
                  </button>
                  <span>
                    (*) Phí phụ thu sẽ được tính khi bạn tiến hành thanh toán.
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}
      {showComplete && (
        <div className="complete_contaier">
          <h1>Cảm ơn Bạn</h1>
          <p>
            Chúng tôi sẽ chuẩn bị cho đơn hàng của bạn trong thời gian sớm nhất.
            Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi. Chúc bạn
            thành công và may mắn.
          </p>
          <button
            className="view_order_btn"
            onClick={() => handleCompletebtn()}
          >
            Xem thông tin đặt hàng
          </button>
          <a className="ruleLink formorderrulelink">
            {" "}
            xem lại điều khoản và diều kiện của website
          </a>
        </div>
      )}
    </div>
  );
};

export default FormOrder;