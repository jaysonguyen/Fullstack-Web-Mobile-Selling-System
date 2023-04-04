import axios from "../setup/axios";

const getTypeProduct = () => {
  return axios.get(`/api/type/product/get`);
};


export { getTypeProduct };
