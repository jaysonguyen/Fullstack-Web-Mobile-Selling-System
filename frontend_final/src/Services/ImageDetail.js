import axios from "../setup/axios";

const getImageDetail = () => {
  return axios.get(`/api/image/product/get`);
};


export { getImageDetail };
