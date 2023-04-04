import React, { useEffect, useState } from "react";
import "./Body.css";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllMobilePhone } from "../../Services/mobileService";
import { getColorProduct } from "../../Services/colorService";
import { getTypeProduct } from "../../Services/typeServices";
import Slider from "../Slider/Slider";

const Body = (props) => {
  const [mobile, setMobile] = useState([]);
  const [mobileInfor, setMobileInfor] = useState([]);
  const [color, setColor] = useState([]);
  const [type, setType] = useState([]);

  useEffect(async () => {
    await fetchData();
  }, []);

  const fetchData = async () => {
    let data = await getAllMobilePhone();
    let colorData = await getColorProduct();
    let typeData = await getTypeProduct();
    setMobile(data.DT);
    setColor(colorData.DT);
    setType(typeData.DT);
  };

  return (
    <div className="body-container">
      <Slider />
      {type.map((type, index) => {
        return (
          <>
            <h5 key={index} className="type-title">
              {type.name_product_type}
            </h5>
            ;
            <Row className="row">
              {mobile.map((item, index) => {
                if (item.id_type_product === type.id_product_type) {
                  return (
                    <Col className="column">
                      <Link key={index} href="/">
                        <div className="card">
                          {/* <div className="status">Tạm hết hàng</div> */}
                          <div className="imageProduct">
                            <img className="imgPhone" src={item.image_sig} />
                          </div>
                          <p className="NamePhone">{item.product_name}</p>
                          <div className="color-product">
                            {color.map((element) => {
                              if (
                                element.ID_PRODUCT == item.id_product &&
                                element.COLOR_HEXA_CODE != "#fff"
                              ) {
                                return (
                                  <>
                                    <div
                                      className="spot"
                                      style={{
                                        backgroundColor:
                                          element.COLOR_HEXA_CODE,
                                      }}
                                    ></div>
                                  </>
                                );
                              }
                            })}
                          </div>
                          <div className="price-contain">
                            <p className="price">{item.price}</p>
                            <p className="price-old">34.000.000</p>
                          </div>
                        </div>
                      </Link>
                    </Col>
                  );
                }
              })}
            </Row>
          </>
        );
      })}
    </div>
  );
};

export default Body;
