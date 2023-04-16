import axios from "../setup/axios";
const gethardWareList = () => {
  return axios.get(`/api/hardware/get`);
};

const getOneHw = (id) => {
  return axios.get(`/api/hardware/get/one/${id}`);
};

export { gethardWareList, getOneHw };
