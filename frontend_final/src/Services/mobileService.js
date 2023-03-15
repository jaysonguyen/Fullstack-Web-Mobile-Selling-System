import axios from "../setup/axios";

const getAllMobilePhone = () => {
  return axios.get(`/api/mobile`);
};

export { getAllMobilePhone };
