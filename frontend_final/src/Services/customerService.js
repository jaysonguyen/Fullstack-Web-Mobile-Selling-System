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

const getCustomerLogin = () => {
  return axios.get(`api/customer/login`);
}

export { registerNewUser, getCustomerList, getCustomerLogin};
