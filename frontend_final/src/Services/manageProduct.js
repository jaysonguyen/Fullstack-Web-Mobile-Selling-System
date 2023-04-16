import axios from "../setup/axios";

const getAllProductList = () => {
    return axios.get(`/api/productlist/getall`);
};
export {getAllProductList} ;