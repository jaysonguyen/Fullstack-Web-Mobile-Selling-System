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
import { toast } from "react-toastify";
import { createOrder } from "../../Services/orderServices";
import { createOnlinePay } from "../../Services/orderServices";
import { useNavigate } from "react-router-dom";
import { rmAll } from "../../Services/cart";

const FormOrder = ({ mobileInfor, cart, total }) => {
  const navigate = useNavigate();
  const [showComplete, setShowComplete] = useState(false);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [paymentMethod, setPayMenthod] = useState(0);
  const [billStatus, setBillStatus] = useState("Chờ");

  const cusToken = localStorage.getItem("customerKey");
  const sessionData = sessionStorage.getItem("account");
  const handleGetInforByEmail = async () => {
    try {
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
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi khi lấy thông tin khách hàng");
    }
  };

  const handleGoback = () => {
    navigate("/");
  };

  const handleDeleteAllCart = async () => {
    let data = await rmAll(cusToken);
  };

  useEffect(() => {
    handleGetInforByEmail();
  }, [total]);

  const handlePayMenthod = (id) => {
    setPayMenthod(id);
  };

  const handleCompletebtn = async () => {
    try {
      if (name === "") {
        toast.error("Vui lòng điền tên người đặt");
      } else if (phone === "") {
        toast.error("Vui lòng điền số điện thoại");
      } else if (email === "") {
        toast.error("Vui lòng điền địa chỉ email");
      } else if (address === "") {
        toast.error("Vui lòng điền địa chỉ nhận hàng");
      } else {
        if (paymentMethod === 1) {
          console.log("Thanh toán chuyển khoản");
          if (total !== 0) {
            const data = await createOnlinePay(total);
            if (data) {
              location.href = data.DT;
              const dataUSer = await createOrder(
                name,
                phone,
                email,
                address,
                total,
                paymentMethod,
                cart
              );
              localStorage.setItem("cartID", dataUSer.DT);
            }
          }
        }
        if (paymentMethod === 0) {
          const dataUSer = await createOrder(
            name,
            phone,
            email,
            address,
            total,
            paymentMethod,
            cart
          );
          toast.success("Đặt hàng thành công");
          localStorage.removeItem("cartID");
          if (dataUSer) {
            console.log(dataUSer.DT);
            localStorage.removeItem("customerKey");
            setShowComplete(true);
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi khi hoàn thành đơn hàng");
    }
  };

  return (
    <div className="order_container_form">
      {!showComplete && (
        <Container fluid>
          <Row>
            <Col className="item_order" lg={6}>
              <h3 className="order_heading">Tóm tắt đơn đặt</h3>
              <p className="order_desc">
                Kiểm tra lại sản phẩm và chọn công ty vận chuyển phù hợp với bạn
              </p>
              {cart &&
                cart.map((item) => {
                  return (
                    <>
                      <ul className="infor_product_body body_value_order border_around">
                        <li className="infor_product_body infor_image order">
                          <img src={item.imageItem} />
                        </li>
                        <li className="infor_product_body infor_name name_order">
                          <span>{item.nameItem}</span>
                          <div className="infor_product_order">
                            <span>Cấu hình: {item.hardware}</span>
                            <span className="color_container_span">
                              Màu sắc:{" "}
                              <span
                                style={{ backgroundColor: `${item.colorItem}` }}
                                className="color_cart_order"
                              ></span>
                            </span>
                          </div>
                        </li>
                        <li className="infor_product_body infor_price">
                          <p>
                            {" "}
                            {item.priceItem.toLocaleString("de-De")}
                            <span>&#8363;</span>
                          </p>
                        </li>
                      </ul>
                    </>
                  );
                })}
              <div className="shipping_method">
                <h3 className="order_heading method_receive">
                  Chọn phương thức thanh toán
                </h3>
                <div className="payment_method_container">
                  <ul
                    onClick={() => handlePayMenthod(0)}
                    className={`infor_product_body body_value_order border_around payment_method_list ${
                      paymentMethod == 0 ? "active_paymethod" : ""
                    }`}
                  >
                    <li className="infor_product_body infor_image order">
                      <img src={logoStore} />
                    </li>
                    <li className="infor_product_body infor_name name_order">
                      <span>Nhận máy tại cửa hàng</span>
                      <div className="infor_product_order">
                        <span>Thanh toán và nhận hàng tại cửa hàng</span>
                      </div>
                    </li>
                    <li className="infor_product_body infor_price">
                      <p></p>
                    </li>
                  </ul>
                  <ul
                    onClick={() => handlePayMenthod(1)}
                    className={`infor_product_body body_value_order border_around payment_method_list  ${
                      paymentMethod == 1 ? "active_paymethod" : ""
                    }`}
                  >
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
                  <input
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className="name_user"
                    placeholder="Tên"
                  />
                  <label>Số điện thoại</label>
                  <input
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    className="phone_number"
                    placeholder="Số điện thoại"
                  />
                  <label>Email</label>
                  <input
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="email"
                    placeholder="Email"
                  />
                  <label>Địa chỉ</label>
                  <input
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    className="address"
                    placeholder="Địa chỉ"
                  />
                </div>
                <div className="amount_container">
                  <p className="subTotal">
                    Tổng phụ:{" "}
                    <span className="total_price subTotal_price">
                      {total.toLocaleString("de-De")}
                      <span>&#8363;</span>
                    </span>
                  </p>
                  <p>
                    Tổng cộng:{" "}
                    <span className="total_price">
                      {total.toLocaleString("de-De")}
                      <span>&#8363;</span>
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
          <button className="view_order_btn" onClick={() => handleGoback()}>
            Trở về trang chủ
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
