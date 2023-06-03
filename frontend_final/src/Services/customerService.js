import axios from "../setup/axios";

const registerNewUser = (
  customer_name,
  phone_number,
  date_of_birth,
  customer_password,
  email,
  cusAddress
) => {
  return axios.post(`/api/customer/register`, {
    customer_name,
    phone_number,
    date_of_birth,
    customer_password,
    email,
    cusAddress,
  });
};

const getCustomerList = () => {
  return axios.get(`/api/customer/get/list`);
};

const checkInforCusomter = (email, password) => {
  return axios.post(`api/customer/login`, {
    email,
    password,
  });
};

const getInforByEmailCus = (email) => {
  return axios.get(`api/customer/get/inforby/email/${email}`);
};

const changePass = (email, pass) => {
  return axios.put(`api/customer/change/pass/${email}`, {
    pass,
  });
};

export {
  registerNewUser,
  getCustomerList,
  checkInforCusomter,
  getInforByEmailCus,
  changePass,
};
