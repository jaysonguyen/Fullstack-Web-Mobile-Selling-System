import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Cart.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { BsChevronRight, BsCaretLeft } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import Carousel from "react-multi-carousel";
import FormOrder from "./FormOrder";

const Cart = (props) => {
  const [showCart, setShowCart] = useState(false);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const handleShowShowCart = () => {
    let flag = !showCart;
    setShowCart(flag);
  };

  return (
    <div className="cart_container">
      {showCart && (
        <>
          <div className="link_old_page_container">
            <Link className="link_old_page">Trang chủ</Link>
            <BsChevronRight className="link_left_caret--icon" />
            <Link className="link_old_page">Giỏ hàng</Link>
          </div>
          <div className="cart_content">
            <Container fluid>
              <Row className="row-margin">
                <Col className="col-no-padding" xl={9}>
                  <div className="infor_product_container">
                    <ul className="infor_product_heading">
                      <li className="infor_product_body infor_image">
                        Hình ảnh
                      </li>
                      <li className="infor_product_body infor_name">
                        Tên sản phẩm
                      </li>
                      <li className="infor_product_body infor_price">
                        Giá bán
                      </li>
                      <li className="infor_product_body infor_quantity">
                        Số lượng
                      </li>
                    </ul>
                    <div className="seperate"></div>
                    <ul className="infor_product_body body_value_order">
                      <li className="infor_product_body infor_image order">
                        <img src="https://shopdunk.com/images/thumbs/0008734_iphone-14-pro-128gb_80.png" />
                      </li>
                      <li className="infor_product_body infor_name name_order">
                        <span>IPhone 14 Pro Max</span>
                        <div className="infor_product_order">
                          <span>Hình thức: Mua thẳng</span>
                          <span>Cấu hình: 256GB</span>
                          <span>Màu sắc: GOLD</span>
                          <h6 className="edit_infor_product">Sửa</h6>
                        </div>
                      </li>
                      <li className="infor_product_body infor_price">
                        <p>
                          {" "}
                          29.000.000<span>&#8363;</span>
                        </p>
                      </li>
                      <li className="infor_product_body infor_quantity order">
                        <p>1</p>
                        <MdDeleteOutline className="delete--icon" />
                      </li>
                    </ul>

                    <div className="seperate"></div>
                    <ul className="infor_product_body body_value_order">
                      <li className="infor_product_body infor_image order">
                        <img src="https://shopdunk.com/images/thumbs/0008734_iphone-14-pro-128gb_80.png" />
                      </li>
                      <li className="infor_product_body infor_name name_order">
                        <span>IPhone 14 Pro Max</span>
                        <div className="infor_product_order">
                          <span>Hình thức: Mua thẳng</span>
                          <span>Cấu hình: 256GB</span>
                          <span>Màu sắc: GOLD</span>
                          <h6 className="edit_infor_product">Sửa</h6>
                        </div>
                      </li>
                      <li className="infor_product_body infor_price">
                        <p>
                          {" "}
                          29.000.000<span>&#8363;</span>
                        </p>
                      </li>
                      <li className="infor_product_body infor_quantity order">
                        <p>1</p>
                        <MdDeleteOutline className="delete--icon" />
                      </li>
                    </ul>
                    <div className="footer_oder_product">
                      <a className="update_cart_btn">Cập nhật giỏ hàng</a>
                      <a className="buy_continue_btn">Tiếp tục mua sắm</a>
                    </div>
                  </div>
                </Col>
                <Col
                  className="col-no-padding no-padding-right posionStick"
                  xl={3}
                >
                  <div className="infor_product_container">
                    <div className="input_coupon">
                      <input placeholder="Mã giảm giá" />
                      <button>Áp dụng</button>
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
                    <div className="seperate"></div>
                    <div className="accept_rule">
                      <input type="checkbox" />
                      Tôi đã đọc và đồng ý với
                      <a className="ruleLink">
                        {" "}
                        điều khoản và diều kiện của website
                      </a>
                    </div>
                    <div className="accept_rule">
                      <button
                        className="order_btn"
                        onClick={() => handleShowShowCart()}
                      >
                        Tiến hành đặt hàng
                      </button>
                      <span>
                        (*) Phí phụ thu sẽ được tính khi bạn tiến hành thanh
                        toán.
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="access_container">
                <h3>Gợi ý phụ kiện đi kèm</h3>
                <Carousel
                  responsive={responsive}
                  autoPlaySpeed={5000}
                  autoPlay={true}
                  infinite={true}
                  rewind={true}
                  className="access_item"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  transitionDuration={500}
                >
                  <div className="access_item">
                    <div className="access_img">
                      <img src="https://shopdunk.com/images/thumbs/0002755_iphone-14-pro-leather-case-with-magsafe_240.jpeg" />
                    </div>
                    <p className="name_access">
                      iPhone 14 Pro Leather Case with MagSafe
                    </p>
                    <p className="price_access">
                      {" "}
                      500.000<span>&#8363;</span>
                    </p>
                    <button className="buy_btn">Mua Ngay</button>
                    <span className="sub_access">
                      Giảm giá mua kèm:{" "}
                      <span className="sub_price">200.000</span>
                      <span>&#8363;</span>
                    </span>
                  </div>
                  <div className="access_item">
                    <div className="access_img">
                      <img src="https://shopdunk.com/images/thumbs/0002755_iphone-14-pro-leather-case-with-magsafe_240.jpeg" />
                    </div>
                    <p className="name_access">
                      iPhone 14 Pro Leather Case with MagSafe
                    </p>
                    <p className="price_access">
                      500.000<span>&#8363;</span>
                    </p>
                    <button className="buy_btn">Mua Ngay</button>
                    <span className="sub_access">
                      Giảm giá mua kèm:{" "}
                      <span className="sub_price">200.000</span>
                      <span>&#8363;</span>
                    </span>
                  </div>
                </Carousel>
              </div>
            </Container>
          </div>
        </>
      )}
      {!showCart && (
        <>
          <button className="back_btn" onClick={() => handleShowShowCart()}>
            <BsCaretLeft />
            Trở về
          </button>
          <FormOrder />
        </>
      )}
    </div>
  );
};

export default Cart;
