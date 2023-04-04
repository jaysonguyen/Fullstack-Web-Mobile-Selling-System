import React from "react";

const Slider = (props) => {
  return (
    <div>
      <section class="main-banner swiper mySwiper">
        <div class="wrapper swiper-wrapper">
          <div class="slide swiper-slide">
            <img class="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEY0xOOd_1bL7ECUrGU-3TSAArTpVzXmorxA&usqp=CAU" alt="" />
          </div>

          <div class="slide swiper-slide">
            <img class="img" src="../img/banner/b2.jpeg" alt="" />
          </div>
        </div>

        <div class="swiper-button-next "></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </section>
    </div>
  );
};

export default Slider;
