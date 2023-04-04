import axios from "../setup/axios";

const getColorProduct = () => {
  return axios.get(`/api/color/get`);
};


export { getColorProduct };
