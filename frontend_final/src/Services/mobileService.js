import axios from "../setup/axios";

const getAllMobilePhone = () => {
  return axios.get(`/api/product/findall`);
};

const createMobilePhone = (userData) => {
  console.log("User data: >>>>>", userData);
  return axios.post("/api/product/", {
    ...userData,
  });
};

const deleteMobilePhone = (id) => {
  console.log("User's id: ", id);
  return axios.delete("/api/mobile/", {
    ...id,
  });
};

const getOne = (id) => {
  return axios.get(`/api/product/get/one/${id}`);
};

export { getAllMobilePhone, createMobilePhone, deleteMobilePhone, getOne };
