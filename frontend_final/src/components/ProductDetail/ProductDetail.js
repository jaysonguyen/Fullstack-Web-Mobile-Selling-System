import React, { useEffect, useState } from "react";
import { readSlider } from "../../Services/sliderService";
import "./ProductDetail.css";
import { getColorProduct } from "../../Services/colorService";
import { useParams } from "react-router-dom";
import { gethardWareList } from "../../Services/hardWare";
import { getImageDetail } from "../../Services/ImageDetail";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getAllMobilePhone } from "../../Services/mobileService";
import { getAccessory } from "../../Services/accessory";
import { BsStar, BsStarFill } from "react-icons/bs";
import { AiOutlineGift } from "react-icons/ai";
import { toast } from "react-toastify";

const ProductDetail = (props) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  let idProduct = useParams();

  const [color, setColor] = useState([]);
  const [hardware, setHardware] = useState([]);
  const [imagedetail, setImageDetail] = useState([]);
  const [product, setProduct] = useState([]);
  const [accessory, setAccessory] = useState([]);

  const [colorPro, setColorPro] = useState("");
  const [hw, setHw] = useState("");

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

  const handleBuyBtn = (e) => {
    e.preventDefault();
    if (data.color == "") {
      toast.error("Vui lòng chọn màu sắc");
    } else if (data.hw == "") {
      toast.error("Vui lòng chọn cấu hình");
    } else {
      sessionStorage.setItem("cart", JSON.stringify(data));
      toast.success(`Đã thêm sản phẩm với id: ${data.id.id} vào giỏ hàng`);
    }
  };

  const fetchProduct = async () => {
    try {
      let dataproduct = await getAllMobilePhone();
      setProduct(dataproduct.DT);
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
      let data = await gethardWareList();
      setHardware(data.DT);
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

  useEffect(() => {
    fetchcolor();
    fectchHardware();
    fetchImage();
    fetchProduct();
    fetchAccessory();
  }, []);

  return (
    <div className="body-main">
      <div className="top">
        <div className="left">
          {/* <div className="slideshow-container">
            <Carousel
              responsive={responsive}
              autoPlaySpeed={5000}
              autoPlay={true}
              infinite={true}
              rewind={true}
              className="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              transitionDuration={500}
            >
              {imagedetail &&
                imagedetail.map((item, key) => {
                  if (
                    idProduct.id == item.ID_PRODUCT &&
                    item.is_valid == true
                  ) {
                    return (
                      <div className="mySlides fade" key={key}>
                        <img src={item.IMAGE_LINK}/>
                      </div>
                    );
                  }
                })}
            </Carousel>
          </div> */}
          {product &&
            product.map((product) => {
              if (idProduct.id == product.id_product) {
                return (
                  <div className="slide-img" key={product.id_product}>
                    <img src={product.image_sig} style={{width:200,height:300}}/>
                  </div>
                );
              }
            })}
        </div>
        <div className="right">
          <div className="right-content">
            {product &&
              product.map((product, key) => {
                if (idProduct.id == product.id_product) {
                  return (
                    <h2 onChange={() => setName()} key={key}>
                      {product.product_name}
                    </h2>
                  );
                }
              })}
            <div className="rating_icon">
              <BsStarFill className="star-checked" />
              <BsStarFill className="star-checked" />
              <BsStarFill className="star-checked" />
              <BsStar className="star-checked" />
              <BsStar className="star-checked" />
              Đánh giá
            </div>

            <div className="gach"></div>
            {product.map((product, key) => {
              if (idProduct.id == product.id_product) {
                return (
                  <div className="gia" key={key}>
                    <div className="giamoi" id="price">
                      {product.price.toLocaleString("de-DE")}
                      <span>&#8363;</span>
                    </div>
                  </div>
                );
              }
            })}

            <div className="dungluong">
              Dung lượng
              <ul>
                {hardware &&
                  hardware.map((hardware, key) => {
                    if (idProduct.id == hardware.ID_HARDWARE_CONFIGURATION) {
                      return (
                        <li key={key}>
                          <button
                            className="storage_select_btn"
                            onClick={() => setHw(hardware.STORAGE)}
                            id="dl1"
                            htmlFor=""
                          >
                            {hardware.STORAGE}
                          </button>
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
            <div className="mau">
              Màu sắc
              <ul>
                {color.map((color, key) => {
                  if (idProduct.id == color.ID_PRODUCT) {
                    return (
                      <li key={key}>
                        <button
                          className="color_select_btn"
                          onClick={() => setColorPro(color.COLOR_HEXA_CODE)}
                          style={{
                            backgroundColor: `${color.COLOR_HEXA_CODE}`,
                          }}
                        ></button>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="chuongtrinh">
              <div className="km">
                <p className="p-km">
                  {" "}
                  <AiOutlineGift className="gift-icon" /> <b>Khuyến mãi </b>
                </p>
                 {" "}
                <input
                  type="radio"
                  id="muathang"
                  name="fav_language"
                  value="muathang"
                />
                  <label htmlFor="muathang">Mua thẳng</label>
                <br /> {" "}
                <input
                  type="radio"
                  id="gop"
                  name="fav_language"
                  value="gop"
                />  <label htmlFor="gop">Trả góp</label>
                <br /> {" "}
                <input
                  type="radio"
                  id="baohanh"
                  name="fav_language"
                  value="baohanh"
                />
                 {" "}
                <label htmlFor="baohanh">
                  giá ưu đãi mua kèm bảo hành kim cương
                </label>
                <br />
                <br />
              </div>
              <div className="uudai">
                <p className="p-km">
                  {" "}
                  <AiOutlineGift className="gift-icon" /> <b>Ưu đãi </b>
                </p>
                <p>Mừng khai trương (duy nhất 25.03 - 26.03 - SL có hạn)</p>
                <p>
                  iPhone 14 Pro Max 128GB giảm 10.000.000đ chỉ còn 26.990.000đ
                </p>
              </div>
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
      </div>
      <div className="bot">
        <h2>Gợi ý phụ kiện đi kèm</h2>
        <div className="contain">
          <div className="swiper mySwiper">
            <div className="swiper-wrapper">
              {accessory.map((item, key) => {
                return (
                  <div className="swiper-slide" key={key}>
                    <div className="column">
                      <div className="card">
                        <img className="imgPhone" src={item.image_access} />
                        <p className="NamePhone">{item.ACCESSORY_NAME}</p>
                        <p className="price">
                          {item.PRICE.toLocaleString("de-De")}
                          <span>&#8363;</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>

      {/* <div className="product-review">
        <h2> Đánh giá sản phẩm </h2>
        <div className="container-product-review">
          <div className="rate">
            <div className="all-rating-list"></div>
          </div>
          <div className="comment"></div>
        </div>
      </div> */}

      <div className="thongtin">
        <h2 style={{ textAlign: "center" }}>Thông Tin</h2>
        <p>
          iPhone 14 Pro Max. Bắt trọn chi tiết ấn tượng với Camera Chính 48MP.
          Trải nghiệm iPhone theo cách hoàn toàn mới với Dynamic Island và màn
          hình Luôn Bật. Công nghệ an toàn quan trọng – Phát Hiện Va Chạm thay
          bạn gọi trợ giúp khi cần kíp <br />
          <span id="dots"></span>
          <span id="more">
            Tính năng nổi bật Màn hình Super Retina XDR 6,7 inch với tính năng
            Luôn Bật và ProMotion Dynamic Island, một cách mới tuyệt diệu để
            tương tác với iPhone Camera Chính 48MP cho độ phân giải gấp 4 lần
            Chế độ Điện Ảnh nay đã hỗ trợ 4K Dolby Vision tốc độ lên đến 30 fps
            Chế độ Hành Động để quay video cầm tay mượt mà, ổn định Công nghệ an
            toàn quan trọng Phát Hiện Va Chạm thay bạn gọi trợ giúp khi cần kíp
            Thời lượng pin cả ngày và thời gian xem video lên đến 29 giờ A16
            Bionic, chip điện thoại thông minh tuyệt đỉnh. Mạng di động 5G siêu
            nhanh Các tính năng về độ bền dẫn đầu như Ceramic Shield và khả năng
            chống nước iOS 16 đem đến thêm nhiều cách để cá nhân hóa, giao tiếp
            và chia sẻ Pháp lý SOS Khẩn Cấp sử dụng kết nối mạng di động hoặc
            Cuộc Gọi Wi-Fi. Màn hình có các góc bo tròn. Khi tính theo hình chữ
            nhật, kích thước màn hình theo đường chéo là 6,69 inch. Diện tích
            hiển thị thực tế nhỏ hơn. Thời lượng pin khác nhau tùy theo cách sử
            dụng và cấu hình; truy cập để biết thêm thông tin. Cần có gói cước
            dữ liệu. Mạng 5G chỉ khả dụng ở một số thị trường và được cung cấp
            qua một số nhà mạng. Tốc độ có thể thay đổi tùy địa điểm và nhà
            mạng. . iPhone 14 Pro Max có khả năng chống tia nước, chống nước và
            chống bụi. Sản phẩm đã qua kiểm nghiệm trong điều kiện phòng thí
            nghiệm có kiểm soát đạt mức IP68 theo tiêu chuẩn IEC 60529 (chống
            nước ở độ sâu tối đa 6 mét trong vòng tối đa 30 phút). Khả năng
            chống tia nước, chống nước và chống bụi không phải là các điều kiện
            vĩnh viễn. Khả năng này có thể giảm do hao mòn thông thường. Không
            sạc pin khi iPhone đang bị ướt. Vui lòng tham khảo hướng dẫn sử dụng
            để biết cách lau sạch và làm khô máy. Không bảo hành sản phẩm bị
            hỏng do thấm chất lỏng. Một số tính năng không khả dụng tại một số
            quốc gia hoặc khu vực.
          </span>
        </p>
        <button className="readmore" id="myBtn">
          Xem Thêm
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
