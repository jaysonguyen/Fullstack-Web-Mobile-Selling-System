import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { Row, Col, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { getAllMobilePhone } from "../../Services/mobileService";
import { getColorProduct } from "../../Services/colorService";
import { getTypeProduct } from "../../Services/typeServices";
import "react-multi-carousel/lib/styles.css";
import Footer from "../../components/Footer/Footer";
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
import SliderVideo from "../HomePage/SliderVideo";

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
    <>
      <SliderVideo />
      <div className="body-container">
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
        <h1 className="type_heading">Máy tính bảng phù hợp với bạn</h1>
        <Container fluid>
          <div className="row">
            {mobile &&
              mobile.map((item, index) => {
                if (item.id_type_product == 3) {
                  return (
                    <Col lg={3} key={item.id_product}>
                      <Link
                        className="product_link"
                        to={`/product_detail/${item.id_product}`}
                      >
                        <div className="product_link_card">
                          <div className="imageProduct">
                            <img
                              className="imgPhone"
                              src={item.image_sig}
                              alt={item.product_name}
                            />
                          </div>
                          <div className="color-product">
                            {color
                              .filter(
                                (element) =>
                                  element.ID_PRODUCT === item.id_product
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
                          <p className="new_product_tag">mới</p>
                          <p className="NamePhone">{item.product_name}</p>
                          <p className="product_desc">{item.PRODUCT_DESC}</p>
                          <div className="price-contain">
                            <p className="price">
                              Từ {item.price.toLocaleString("de-DE")}
                              <span>&#8363;</span>
                            </p>
                          </div>
                          <button className="buyButton">Mua</button>
                        </div>
                      </Link>
                    </Col>
                  );
                }
              })}
          </div>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default ProductList;
