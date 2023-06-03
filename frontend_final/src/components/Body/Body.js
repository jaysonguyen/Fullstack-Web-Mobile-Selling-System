import React, { useEffect, useState } from "react";
import "./Body.css";
import { Row, Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { getAllMobilePhone } from "../../Services/mobileService";
import { getColorProduct } from "../../Services/colorService";
import { getTypeProduct } from "../../Services/typeServices";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Slider from "../Slider/Slider";
import access from "./access.png";
import airpod from "./airpod.png";
import applewatch from "./applewatch.png";
import ipad from "./ipad.png";
import iphone from "./iphone.png";
import mac from "./mac.png";
import airtag from "./airtag.jpg";

const Body = (props) => {
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
      <h1 className="store_heading_homepage">
        <span>Cửa hàng.</span> Cách tốt nhất để mua sản phẩm mà bạn yêu thích.
      </h1>
      <ul className="type_product_list">
        <li>
          <div className="image_type_product_item">
            <img src={mac} />
            <h6 className="name_type_product">Laptop</h6>
          </div>
        </li>
        <li>
          <div className="image_type_product_item">
            <img src={iphone} />
            <h6 className="name_type_product">Điện thoại</h6>
          </div>
        </li>
        <li>
          <div className="image_type_product_item">
            <img src={ipad} />
            <h6 className="name_type_product">Máy tính bảng</h6>
          </div>
        </li>
        <li>
          <div className="image_type_product_item">
            <img src={applewatch} />
            <h6 className="name_type_product">Đồng hồ</h6>
          </div>
        </li>
        <li>
          <div className="image_type_product_item">
            <img src={airpod} />
            <h6 className="name_type_product">Âm thanh</h6>
          </div>
        </li>
        <li>
          <div className="image_type_product_item">
            <img src={access} />
            <h6 className="name_type_product">Phụ kiện</h6>
          </div>
        </li>
      </ul>
      <Row>
        <h1 className="type_heading">Điện thoại nào phù hợp với bạn?</h1>
        {mobile &&
          mobile.map((item, index) => {
            if (item.id_type_product === 1 && index < 4) {
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
                            (element) => element.ID_PRODUCT === item.id_product
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
      </Row>
      <h1 className="type_heading">Phụ kiện nổi bật</h1>
      <Row>
        <Col className="airtag_anounment_container" lg={7}>
          <div className="image_access_anount">
            <img src={airtag} />
          </div>
        </Col>
        <Col className="airtag_anounment_container name_container_airtag" lg={5}>
          <div className="name_access_anount">Airtag</div>
          <div className="desc_access_anount">
            Gắn một cái vào chìa khóa của bạn. Đặt một cái khác vào ba lô. Nhỡ
            có thất lạc, chỉ cần dùng ứng dụng Tìm.
          </div>
          <a className="buy_link">Mua phụ kiện</a>
        </Col>
      </Row>
      <Row>
        {mobile &&
          mobile.map((item) => {
            if (item.id_type_product === 2) {
              return (
                <>
                  <h1 className="type_heading">Máy tính bản</h1>
                  <Col lg={3} key={item.id_product}>
                    <Link
                      className="product_link"
                      to={`/product_detail/${item.id_product}`}
                    >
                      <div className="card">
                        <div className="imageProduct">
                          <img
                            className="imgPhone"
                            src={item.image_sig}
                            alt={item.product_name}
                          />
                        </div>
                        <p className="NamePhone">{item.product_name}</p>
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
                        <div className="price-contain">
                          <p className="price">
                            {item.price.toLocaleString("de-DE")}
                            <span>&#8363;</span>
                          </p>
                        </div>
                        <button className="buyButton">Mua ngay</button>
                      </div>
                    </Link>
                  </Col>
                </>
              );
            }
          })}
      </Row>
      <Row>
        {mobile &&
          mobile.map((item) => {
            if (item.id_type_product === 3) {
              return (
                <>
                  <h1 className="type_heading">Laptop</h1>
                  <Col lg={3} key={item.id_product}>
                    <Link
                      className="product_link"
                      to={`/product_detail/${item.id_product}`}
                    >
                      <div className="card">
                        <div className="imageProduct">
                          <img
                            className="imgPhone"
                            src={item.image_sig}
                            alt={item.product_name}
                          />
                        </div>
                        <p className="NamePhone">{item.product_name}</p>
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
                        <div className="price-contain">
                          <p className="price">
                            {item.price.toLocaleString("de-DE")}
                            <span>&#8363;</span>
                          </p>
                        </div>
                        <button className="buyButton">Mua ngay</button>
                      </div>
                    </Link>
                  </Col>
                </>
              );
            }
          })}
      </Row>
      <Row>
        {mobile.map((item) => {
          if (item.id_type_product === 4) {
            return (
              <>
                <h1 className="type_heading">Âm thanh</h1>
                <Col lg={3} key={item.id_product}>
                  <Link
                    className="product_link"
                    to={`/product_detail/${item.id_product}`}
                  >
                    <div className="card">
                      <div className="imageProduct">
                        <img
                          className="imgPhone"
                          src={item.image_sig}
                          alt={item.product_name}
                        />
                      </div>
                      <p className="NamePhone">{item.product_name}</p>
                      <div className="color-product">
                        {color &&
                          color
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
                      <div className="price-contain">
                        <p className="price">
                          {item.price && item.price.toLocaleString("de-DE")}
                          <span>&#8363;</span>
                        </p>
                      </div>
                      <button className="buyButton">Mua ngay</button>
                    </div>
                  </Link>
                </Col>
              </>
            );
          }
        })}
      </Row>
    </div>
  );
};

export default Body;
