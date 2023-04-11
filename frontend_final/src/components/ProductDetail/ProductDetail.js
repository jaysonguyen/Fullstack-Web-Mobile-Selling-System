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
  console.log(idProduct.id);

  const [color, setColor] = useState([]);
  const [hardware, setHardware] = useState([]);
  const [imagedetail, setImageDetail] = useState([]);
  const [product, setProduct] = useState([]);
  const [accessory, setAccessory] = useState([]);

  const fetchAccessory = async () => {
    try {
      let dataproduct = await getAccessory();
      console.log("data Accessory", dataproduct.DT);
      setAccessory(dataproduct.DT);
    } catch (error) {
      console.log(error);
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
      let data = await getImageDetail();

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
    <div class="body-main">
      <div class="top">
        <div class="left">
          <div class="slideshow-container">
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
              {imagedetail.map((item, key) => {
                if (idProduct.id == item.ID_PRODUCT && item.is_valid == true) {
                  return (
                    <div class="mySlides fade" key={key}>
                      <img src={item.IMAGE_LINK} style={{ width: "100%" }} />
                    </div>
                  );
                }
              })}
            </Carousel>
          </div>
          <div class="slide-img"></div>
        </div>
        <div class="right">
          <div class="right-content">
            {product.map((product, key) => {
              if (idProduct.id == product.id_product) {
                return <h2 key={key}>{product.product_name}</h2>;
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

            <div class="gach"></div>
            {product.map((product, key) => {
              if (idProduct.id == product.id_product) {
                return (
                  <div class="gia" key={key}>
                    <div class="giamoi" id="price">
                      {product.price.toLocaleString("de-DE")}
                      <span>&#8363;</span>
                    </div>
                  </div>
                );
              }
            })}

            <div class="dungluong">
              Dung lượng
              <ul>
                {hardware.map((hardware, key) => {
                  if (idProduct.id == hardware.ID_HARDWARE_CONFIGURATION) {
                    return (
                      <li key={key}>
                        <label id="dl1" htmlFor="">
                          {hardware.STORAGE}
                        </label>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
            <div class="mau">
              Màu sắc
              <ul>
                {color.map((color, key) => {
                  if (idProduct.id == color.ID_PRODUCT) {
                    return (
                      <li key={key}>
                        <span
                          style={{
                            backgroundColor: `${color.COLOR_HEXA_CODE}`,
                          }}
                        ></span>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
            <div class="chuongtrinh">
              <div class="km">
                <p class="p-km">
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
                  <label for="muathang">Mua thẳng</label>
                <br /> {" "}
                <input
                  type="radio"
                  id="gop"
                  name="fav_language"
                  value="gop"
                />  <label for="gop">Trả góp</label>
                <br /> {" "}
                <input
                  type="radio"
                  id="baohanh"
                  name="fav_language"
                  value="baohanh"
                />
                 {" "}
                <label for="baohanh">
                  giá ưu đãi mua kèm bảo hành kim cương
                </label>
                <br />
                <br />
              </div>
              <div class="uudai">
                <p class="p-km">
                  {" "}
                  <AiOutlineGift className="gift-icon" /> <b>Ưu đãi </b>
                </p>
                <p>Mừng khai trương (duy nhất 25.03 - 26.03 - SL có hạn)</p>
                <p>
                  iPhone 14 Pro Max 128GB giảm 10.000.000đ chỉ còn 26.990.000đ
                </p>
              </div>
            </div>
            <div class="mua">
              <a href="">
                <button class="btnmua">MUA NGAY</button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="bot">
        <h2>Gợi ý phụ kiện đi kèm</h2>
        <div class="contain">
          <div class="swiper mySwiper">
            <div class="swiper-wrapper">
              {accessory.map((item, key) => {
                return (
                  <div class="swiper-slide" key={key}>
                    <div class="column">
                      <div class="card">
                        <img class="imgPhone" src={item.image_access} />
                        <p class="NamePhone">{item.ACCESSORY_NAME}</p>
                        <p class="price">
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
          <div class="swiper-pagination"></div>
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

      <div class="thongtin">
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
        <button class="readmore" onclick="myFunction()" id="myBtn">
          Xem Thêm
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
