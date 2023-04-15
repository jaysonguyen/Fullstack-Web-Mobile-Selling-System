import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { Row, Col, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { getAllMobilePhone } from "../../Services/mobileService";
import { getColorProduct } from "../../Services/colorService";
import { getTypeProduct } from "../../Services/typeServices";
import Slider from "../Slider/Slider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Nav from "../Nav/Nav";
import {
  HiOutlineFilter,
  HiOutlineCurrencyDollar,
  HiQuestionMarkCircle,
  HiChevronDown,
  HiSortAscending,
  HiSortDescending,
  HiEye,
} from "react-icons/hi";
import { TbTruckDelivery, TbDiscountCheck } from "react-icons/tb";

const ProductList = (props) => {
  const [mobile, setMobile] = useState([]);
  const [color, setColor] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const mobileData = await getAllMobilePhone();
      const colorData = await getColorProduct();
      const typeData = await getTypeProduct();

      setMobile(mobileData.DT);
      setColor(colorData.DT);
      setType(typeData.DT);
    };

    fetchData();

    return () => {
      console.log("return log");
    };
  }, []);

  return (
    <div className="body-container">
      <Nav />
      <Slider />

      {type
        .filter((item) => item.id_product_type === 1)
        .map((item) => (
          <>
            <div className="filter-properties">
              <h2 className="title">Chọn theo tiêu chí </h2>
              <div className="filter-feature">
                <div className="filter-item">
                  <button className="btn-filter">
                    <HiOutlineFilter className="icon" />
                    Bộ lọc{" "}
                  </button>
                </div>
                <div className="filter-item">
                  <button className="btn-filter">
                    <TbTruckDelivery className="icon" /> Sẵn sàng{" "}
                  </button>
                </div>
                <div className="filter-item">
                  <button className="btn-filter">
                    <HiOutlineCurrencyDollar className="icon" />
                    Giá
                  </button>
                </div>
                <div className="filter-item">
                  <button className="btn-filter">
                    Ổ cứng <HiChevronDown className="icon" />{" "}
                    <HiQuestionMarkCircle className="icon" />
                  </button>
                </div>
                <div className="filter-item">
                  <button className="btn-filter">
                    Nhu cầu sử dụng <HiChevronDown className="icon" />{" "}
                    <HiQuestionMarkCircle className="icon" />{" "}
                  </button>
                </div>
                <div className="filter-item">
                  <button className="btn-filter">
                    Dung lượng RAM <HiChevronDown className="icon" />{" "}
                    <HiQuestionMarkCircle className="icon" />{" "}
                  </button>
                </div>
                <div className="filter-item">
                  <button className="btn-filter">
                    CPU <HiChevronDown className="icon" />{" "}
                    <HiQuestionMarkCircle className="icon" />{" "}
                  </button>
                </div>
                <div className="filter-item">
                  <button className="btn-filter">
                    Kích thước màn hình <HiChevronDown className="icon" />{" "}
                    <HiQuestionMarkCircle className="icon" />{" "}
                  </button>
                </div>
                <div className="filter-item">
                  <button className="btn-filter">
                    Card đồ họa <HiChevronDown className="icon" />{" "}
                    <HiQuestionMarkCircle className="icon" />{" "}
                  </button>
                </div>
                <div className="filter-item">
                  <button className="btn-filter">
                    Tính năng đặc biệt <HiChevronDown className="icon" />{" "}
                    <HiQuestionMarkCircle className="icon" />{" "}
                  </button>
                </div>
                <div className="filter-item">
                  <button className="btn-filter">
                    Độ phân giải <HiChevronDown className="icon" />{" "}
                    <HiQuestionMarkCircle className="icon" />
                  </button>
                </div>
              </div>
            </div>
            <div className="sorting-container">
              <h2 className="title">Sắp xếp theo </h2>
              <div className="sorting">
                <div className="filter-item">
                  <button className="btn-filter">
                    <HiSortDescending className="icon" />
                    Giá cao - thấp
                  </button>
                </div>
                <div className="filter-item">
                  <button className="btn-filter">
                    <HiSortAscending className="icon" />
                    Giá thấp - cao
                  </button>
                </div>
                <div className="filter-item">
                  <button className="btn-filter">
                    <TbDiscountCheck className="icon" />
                    Khuyến mãi hot
                  </button>
                </div>
                <div className="filter-item">
                  <button className="btn-filter">
                    <HiEye className="icon" />
                    Xem nhiều
                  </button>
                </div>
              </div>
            </div>
            <Container fluid>
            <Row className="row">
              {mobile.map(
                (mobile) =>
                  mobile.id_type_product === item.id_product_type && (
                    <Col lg = {4} key={mobile.id_product} className="">
                      <Link to={`/product_detail/${mobile.id_product}`} className="product_link">
                        <div className="card">
                          <div className="imageProduct">
                            <img
                              className="imgPhone"
                              src={mobile.image_sig}
                              alt={mobile.product_name}
                            />
                          </div>
                          <p className="NamePhone">{mobile.product_name}</p>
                          <div className="color-product">
                            {color
                              .filter(
                                (element) =>
                                  element.ID_PRODUCT === mobile.id_product &&
                                  element.COLOR_HEXA_CODE !== "#fff"
                              )
                              .map((element) => (
                                <div
                                  key={element.COLOR_HEXA_CODE}
                                  className="spot"
                                  style={{
                                    backgroundColor: element.COLOR_HEXA_CODE,
                                  }}
                                ></div>
                              ))}
                          </div>
                          <div className="price-contain">
                            <p className="price">
                              {mobile.price.toLocaleString("de-DE")}
                              <span>&#8363;</span>
                            </p>
                          </div>
                          <button className="buyButton">Mua ngay</button>
                        </div>
                      </Link>
                    </Col>
                  )
              )}
            </Row>
            </Container>
            
          </>
        ))}
    </div>
  );
};

export default ProductList;
