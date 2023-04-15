import axios from "../setup/axios";

const getAllOrder = () => {
    return axios.get(`/api/orderdetail/getall`);
};

export { getAllOrder } ;