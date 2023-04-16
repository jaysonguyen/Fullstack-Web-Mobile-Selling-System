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

const Body = (props) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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
      <Slider />
      <Row>
        <h1 className="type_heading">Điện thoại</h1>
        {mobile.map((item) => {
          if (item.id_type_product === 1) {
            return (
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
            );
          }
        })}
      </Row>
      <Row>
        {mobile.map((item) => {
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
    </div>
  );
};

export default Body;
