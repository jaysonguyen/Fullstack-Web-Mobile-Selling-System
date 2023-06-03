import React from "react";
import Body from "../Body/Body";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import SliderVideo from "./SliderVideo";

const HomePage = (props) => {
  return (
    <div>
      <SliderVideo />
      <Body />
      <Footer />
    </div>
  );
};

export default HomePage;
