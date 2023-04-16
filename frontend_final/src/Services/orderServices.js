import axios from "../setup/axios";

const createOrder = (userData) => {
  return axios.post("/api/order/create", {
    ...userData,
  });
};

export { createOrder };
