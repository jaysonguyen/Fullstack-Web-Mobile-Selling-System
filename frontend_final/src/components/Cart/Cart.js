import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Cart.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import { BsChevronRight, BsCaretLeft } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import Carousel from "react-multi-carousel";
import FormOrder from "./FormOrder";
import { getOne } from "../../Services/mobileService";
import { toast } from "react-toastify";
import { getCart, rmOne } from "../../Services/cart";

const Cart = (props) => {
  const [showCart, setShowCart] = useState(true);
  const [mobile, setMobile] = useState({});
  const [product, setProduct] = useState([]);
  const [isAgree, setIsAgree] = useState(false);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [newCart, setNewCart] = useState([]);
  const [rmItem, setItem] = useState([]);
  let total = 0;

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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

  const handleSetIsAgree = (event) => {
    setIsAgree(event.target.checked);
  };

  const handleShowShowCart = () => {
    if (isAgree) {
      let flag = !showCart;
      setShowCart(flag);
    } else {
      toast.error("Vui lòng chọn đồng ý các điều khoản");
    }
  };

  const handleDeleteCart = async (id) => {
    let data = await rmOne(id);
    if (data) {
      setProduct((prevProduct) => prevProduct.filter((item) => item.ID !== id));
      window.location.reload();
    }
  };

  const fectchCart = async () => {
    let keyCus = localStorage.getItem("customerKey");
    let data = await getCart(keyCus);
    if (data && +data.EC == 1) {
      setProduct(data.DT);
    }
    if (data && +data.EC != 1) {
      console.log("get data success");
    }
  };

  useEffect(() => {
    fectchCart();
  }, []);

  useEffect(() => {
    let totalPrice = 0;
    for (let i = 0; i < product.length; i++) {
      totalPrice += product[i].priceItem;
    }
    setTotalPrice(totalPrice);
  }, [product]);

  return (
    <div className="cart_container">
      {showCart && (
        <>
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
                    {product.map((item, key) => {
                      return (
                        <>
                          <ul
                            key={key}
                            className="infor_product_body body_value_order"
                          >
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
                                    style={{
                                      backgroundColor: `${item.colorItem}`,
                                    }}
                                    className="color_cart_order"
                                  ></span>
                                </span>
                                <h6
                                  className="edit_infor_product"
                                  onClick={() => handleUpdate()}
                                >
                                  Sửa
                                </h6>
                              </div>
                            </li>
                            <li className="infor_product_body infor_price">
                              <p>
                                {" "}
                                {item.priceItem &&
                                  item.priceItem.toLocaleString("de-DE")}
                                <span>&#8363;</span>
                              </p>
                            </li>
                            <li className="infor_product_body infor_quantity order">
                              <p>1</p>
                              <MdDeleteOutline
                                id={item.ID}
                                onClick={(e) => handleDeleteCart(e.target.id)}
                                className="delete--icon"
                              />
                            </li>
                          </ul>
                        </>
                      );
                    })}
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
                          {totalPrice && totalPrice.toLocaleString("de-DE")}
                          <span>&#8363;</span>
                        </span>
                      </p>
                      <p>
                        Tổng cộng:{" "}
                        <span className="total_price">
                          {totalPrice && totalPrice.toLocaleString("de-DE")}
                          <span>&#8363;</span>
                        </span>
                      </p>
                    </div>
                    <div className="seperate"></div>
                    <div className="accept_rule">
                      <input
                        type="checkbox"
                        checked={isAgree}
                        onChange={handleSetIsAgree}
                      />
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
                  <div className="acc_container">
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
                  <div className="acc_container">
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
          <FormOrder mobileInfor={mobile} cart={product} total={totalPrice} />
        </>
      )}
    </div>
  );
};

export default Cart;
