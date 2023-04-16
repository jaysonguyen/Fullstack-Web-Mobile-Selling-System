import axios from "../setup/axios";

const createOrder = (paymentMethod, idPro, email, hw, color) => {
  return axios.post("/api/order/create", {
    paymentMethod, idPro, email, hw, color
  });
};

export { createOrder };
