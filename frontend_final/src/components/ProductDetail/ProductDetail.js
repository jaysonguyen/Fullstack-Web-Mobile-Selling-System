import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import { getColorProduct } from "../../Services/colorService";
import { useParams } from "react-router-dom";
import { gethardWareList, getOneHw } from "../../Services/hardWare";
import { getImageDetail } from "../../Services/ImageDetail";
import "react-multi-carousel/lib/styles.css";
import { getOneMobile } from "../../Services/mobileService";
import { getAccessory } from "../../Services/accessory";
import Footer from "../Footer/Footer"
import { toast } from "react-toastify";
import { addCart, getCart } from "../../Services/cart";

const ProductDetail = (props) => {
  const idProduct = useParams();

  const [color, setColor] = useState([]);
  const [hardware, setHardware] = useState([]);
  const [imagedetail, setImageDetail] = useState([]);
  const [product, setProduct] = useState([]);
  const [accessory, setAccessory] = useState([]);

  const [cart, setCart] = useState([]);

  const [colorPro, setColorPro] = useState(null);
  const [hw, setHw] = useState([]);

  const fetchAccessory = async () => {
    try {
      let dataproduct = await getAccessory();
      setAccessory(dataproduct.DT);
    } catch (error) {
      console.log(error);
    }
  };

  let data = {
    id: idProduct,
    color: colorPro,
    hw: hw,
  };

  // image, name, price, hw, cl, emailCus

  const handleBuyBtn = (e) => {
    e.preventDefault();
    if (data.color == "") {
      toast.error("Vui lòng chọn màu sắc");
    } else if (data.hw == "") {
      toast.error("Vui lòng chọn cấu hình");
    } else {
      let customerKey = localStorage.getItem("customerKey");
      if (customerKey) {
        let data = addCart(
          product.IMAGE_SIG,
          product.PRODUCT_NAME,
          hw[1],
          hw[0],
          colorPro,
          customerKey
        );
        toast.success("Thêm giỏ hàng thành công!");
      } else {
        let randomNumber = Math.random(1, 9999);
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        let formattedDate =
          year +
          month.toString().padStart(2, "0") +
          day.toString().padStart(2, "0");
        let customerKey = formattedDate + randomNumber;
        localStorage.setItem("customerKey", customerKey);
        let data = addCart(
          product.IMAGE_SIG,
          product.PRODUCT_NAME,
          hw[1],
          hw[0],
          colorPro,
          customerKey
        );

        toast.success("Thêm giỏ hàng thành công!");
      }
    }
  };

  const fetchProduct = async () => {
    try {
      let dataproduct = await getOneMobile(idProduct.id);
      setProduct(dataproduct.DT[0]);
      console.log(setProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImage = async () => {
    try {
      const data = await getImageDetail();
      console.log(data.DT);
      setImageDetail(data.DT);
    } catch (error) {
      console.log(error);
    }
  };

  const fectchHardware = async () => {
    try {
      const data = await getOneHw(idProduct.id);
      console.log(data);
      setHardware(data.DT);
      console.log(hardware);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchcolor = async () => {
    try {
      let data = await getColorProduct();
      setColor(data.DT);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCart = async () => {
    const cusKey = localStorage.getItem("customerKey");
    if (cusKey) {
      let data = await getCart(cusKey);
      setCart(data.DT);
      console.log(data.DT);
    }
  };

  useEffect(() => {
    fetchcolor();
    fectchHardware();
    fetchImage();
    fetchProduct();
    fetchAccessory();
  }, []);

  return (
    <>
      <div className="wishing_container">
        Chúc bạn có trải nghiệm tuyệt vời khi sử dụng dịch vụ của chúng tôi
      </div>
      <div className="body-main">
        <div className="top">
          <div className="left">
            <div className="slideshow-container22">
              {product && (
                <>
                  <h2 onChange={() => setName()} class="proname">
                    {product.PRODUCT_NAME}
                  </h2>
                  <p className="product_detail_desc">{product.PRODUCT_DESC}</p>
                </>
              )}
              {product && (
                <div className="hinh">
                  <img src={product.IMAGE_SIG} className="hinhimg" />
                </div>
              )}
            </div>
          </div>
          <div className="right">
            <div className="mau">
              <span>Màu.</span> Chọn màu bạn yêu thích
              <ul className="list_color_product_detail">
                {color &&
                  color.map((color, key) => {
                    if (idProduct.id == color.ID_PRODUCT) {
                      return (
                        <li
                          className={
                            colorPro === color.COLOR_HEXA_CODE
                              ? "active_color"
                              : ""
                          }
                          key={key}
                        >
                          <button
                            className="color_select_btn"
                            onClick={() => setColorPro(color.COLOR_HEXA_CODE)}
                            style={{
                              backgroundColor: `${color.COLOR_HEXA_CODE}`,
                            }}
                            key={key}
                          ></button>
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
            <div className="dungluong">
              <span>Dung lượng lưu trữ.</span> Bạn cần bao nhiêu dung lượng?
              <ul>
                {hardware &&
                  hardware.map((item, key) => {
                    return (
                      <li
                        className={
                          hw[0] === item.STORAGE
                            ? "hardware_item_button active_hw"
                            : "hardware_item_button"
                        }
                      >
                        <button
                          className="storage_select_btn"
                          onClick={() =>
                            setHw([item.STORAGE, item.priceStorage])
                          }
                          id="dl1"
                          htmlFor=""
                          key={key}
                        >
                          <p className="hardware_storage">{item.STORAGE}</p>
                          <p className="hardware_price">
                            {item.priceStorage &&
                              item.priceStorage.toLocaleString("de-DE")}
                            <span className="hardware_item_price">&#8363;</span>
                            <p>
                              hoặc{" "}
                              {item.priceStorage &&
                                Math.round(
                                  item.priceStorage / 24
                                ).toLocaleString("de-DE")}
                              <span className="hardware_item_price">
                                &#8363;
                              </span>
                              /tháng Trong 24 tháng*
                            </p>
                          </p>
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="mua">
              <a href="">
                <button className="btnmua" onClick={(e) => handleBuyBtn(e)}>
                  MUA NGAY
                </button>
              </a>
            </div>
          </div>
        </div>
        <div class="btns">
          <button type="button" data-menu="thongtin">
            Thông tin
          </button>
          <button type="button" data-menu="TSKT">
            Thông số kỹ thuật
          </button>
          <button type="button" data-menu="CTSP">
            Chi tiết sản phẩm
          </button>
        </div>
        <div className="bot">
          <h2>Gợi ý phụ kiện đi kèm</h2>
          <div className="contain">
            <div className="swiper mySwiper">
              <div className="swiper-wrapper">
                {accessory &&
                  accessory.map((item, key) => {
                    return (
                      <div className="swiper-slide" key={key}>
                        <div className="column">
                          <div className="card">
                            <img className="imgPhone" src={item.image_access} />
                            <p className="NamePhone">{item.ACCESSORY_NAME}</p>
                            <p className="price">
                              {item.PRICE && item.PRICE.toLocaleString("de-De")}
                              <span>&#8363;</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
