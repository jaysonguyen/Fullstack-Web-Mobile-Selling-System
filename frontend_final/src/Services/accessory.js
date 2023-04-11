import axios from "../setup/axios";

const getAccessory = () =>{
    return axios.get(`/api/accessories/findall`);
};

export {  getAccessory };
