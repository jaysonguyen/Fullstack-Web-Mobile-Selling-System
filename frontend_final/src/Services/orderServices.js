import axios from "../setup/axios";

const createOrder = (name, phone, email, address, total, pay, billDetails) => {
  return axios.post("/api/order", {
    name,
    phone,
    email,
    address,
    total,
    pay,
    billDetails,
  });
};

const createOnlinePay = (total) => {
  return axios.post(`/api/order/online/payment`, {
    total,
  });
};

const updateOrderStatus = (id) => {
  return axios.put(`/api/order/update/status`, {
    id,
  });
};

const getOrderUser = (email) => {
  return axios.get(`/api/order/bymail/${email}`);
};

export { createOrder, createOnlinePay, updateOrderStatus, getOrderUser };
