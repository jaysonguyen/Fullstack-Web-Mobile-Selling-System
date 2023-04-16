import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Slider.css";
import { readSlider } from "../../Services/sliderService";
import { useEffect, useState } from "react";

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
const Slider = () => {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    fetchSlider();
  }, [slider]);

  const fetchSlider = async () => {
    try {
      let data = await readSlider();
      setSlider(data.DT);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
      {slider.map((item) => {
        if (item.image_status == true) {
          return (
            <div key={item.id_slider} className="carousel">
              <img className="casrousel-image" src={item.image_link} />
            </div>
          );
        }
      })}
    </Carousel>
  );
};

export default Slider;
