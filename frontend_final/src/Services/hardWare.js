import axios from "../setup/axios";
const gethardWareList = () => {
    return axios.get(`/api/hardware/get`);
 };

export {gethardWareList};