import React, { useEffect, useState } from "react";
import "./Body.css";
import { Row, Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { getAllMobilePhone } from "../../Services/mobileService";
import { getColorProduct } from "../../Services/colorService";
import { getTypeProduct } from "../../Services/typeServices";
import Slider from "../Slider/Slider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
    }
  }, []);

  return (
    <div className="body-container">
      <Slider />
      {type.map((productType) => (
        <div key={productType.id_product_type}>
          <h5 className="type-title">{productType.name_product_type}</h5>
          <Row className="row">
            {mobile
              .filter(
                (item) => item.id_type_product === productType.id_product_type
              )
              .map((item) => (
                <Col key={item.id_product} className="">
                  <Carousel
                    responsive={responsive}
                    showDots={true}
                    autoPlaySpeed={5000}
                    autoPlay={true}
                    infinite={true}
                    rewind={true}
                    className="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    transitionDuration={500}
                  >
                    <Link to={`/product_detail/${item.id_product}`}>
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
                                element.ID_PRODUCT === item.id_product &&
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
                            {item.price.toLocaleString("de-DE")}
                            <span>&#8363;</span>
                          </p>
                        </div>
                        <button className="buyButton">Mua ngay</button>
                      </div>
                    </Link>
                  </Carousel>
                </Col>
              ))}
          </Row>
        </div>
      ))}
    </div>
  );
};

export default Body;
