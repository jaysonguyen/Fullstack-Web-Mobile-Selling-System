import React from "react";
import helloVideo from "./helloVideo.mp4";
import "./Homepage.css";

function SliderVideo(props) {
  return (
    <div className="slider_container">
      <div className="sliderVideo">
        <video autoPlay loop width="500" height="100%">
          <source src={helloVideo} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default SliderVideo;
