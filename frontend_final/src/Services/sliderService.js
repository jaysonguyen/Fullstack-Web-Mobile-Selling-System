import axios from "../setup/axios";

const readSlider = () => {
  return axios.get(`/api/slider/findall`);
};

export { readSlider };
