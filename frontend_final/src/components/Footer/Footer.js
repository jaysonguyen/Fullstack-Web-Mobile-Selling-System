import React from "react";
import "./Footer.css";

const Footer = (props) => {
  return (
    <div>
     <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>Giới thiệu</h6>
            <p class="text-justify">Năm 2023, ĐAPM trở thành đại lý ủy quyền của Apple. Chúng tôi phát triển chuỗi cửa hàng tiêu chuẩn và Apple Mono Store nhằm mang đến trải nghiệm tốt nhất về sản phẩm và dịch vụ của Apple cho người dùng Việt Nam. Đồng thời còn mang tới cảm giác mới mẻ cho các tín đồ đam mê đồ công nghệ.</p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Dịch vụ</h6>
            <ul class="footer-links">
              <li><a href="http://scanfcode.com/category/c-language/">Thu cũ đổi mới</a></li>
              <li><a href="http://scanfcode.com/category/front-end-development/">Đổi trả</a></li>
              <li><a href="http://scanfcode.com/category/back-end-development/">Bảo hành-Sửa chữa</a></li>
              <li><a href="http://scanfcode.com/category/java-programming-language/">Tuyển dụng</a></li>
              <li><a href="http://scanfcode.com/category/android/">Điểm bán lẻ</a></li>
              <li><a href="http://scanfcode.com/category/templates/">Khiếu nại</a></li>
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Liên kết</h6>
            <ul class="footer-links">
              <li><a href="http://scanfcode.com/about/">Trang chủ</a></li>
              <li><a href="http://scanfcode.com/contact/">Sản phẩm</a></li>
              <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Dịch vụ</a></li>
              <li><a href="http://scanfcode.com/privacy-policy/">Tin tức</a></li>
              <li><a href="http://scanfcode.com/sitemap/">Khuyến mãi</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved 
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
              <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
              <li><a class="dribbble" href="#"><i class="fa fa-dribbble"></i></a></li>
              <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
    </div>
  );
};

export default Footer;
