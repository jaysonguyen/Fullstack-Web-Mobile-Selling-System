import axios from "../setup/axios";

const registerNewUser = (
  customer_name,
  phone_number,
  date_of_birth,
  customer_password,
  email
) => {
  return axios.post(`/api/customer/register`, {
    customer_name,
    phone_number,
    date_of_birth,
    customer_password,
    email,
  });
};

const getCustomerList = () => {
   return axios.get(`/api/customer/get/list`);
}

const checkInforCusomter = (email, password) => {
  return axios.post(`api/customer/login`, {
    email,
    password
  });
}

export { registerNewUser, getCustomerList, checkInforCusomter};
