import axios from "../setup/axios";

const getCart = (email) => {
  return axios.get(`/api/cart/${email}`);
};

const addCart = (image, name, price, hw, cl, emailCus) => {
  return axios.post(`/api/cart/`, { image, name, price, hw, cl, emailCus });
};

const rmOne = (id) => {
  return axios.delete(`/api/cart/${id}`);
};

const rmAll = (email) => {
  return axios.delete(`/api/cart/${email}`);
};

export { getCart, addCart, rmOne, rmAll };
