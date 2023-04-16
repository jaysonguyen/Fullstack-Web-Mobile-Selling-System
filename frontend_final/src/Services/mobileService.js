import axios from "../setup/axios";

const getAllMobilePhone = () => {
  return axios.get(`/api/product/findall`);
};

const createMobilePhone = (
  name,
  desc,
  id_type,
  imgSig,
  colorName,
  coLorHexa,
  cpu,
  storage,
  price
) => {
  return axios.post("/api/product/create", {
    name,
    desc,
    id_type,
    imgSig,
    colorName,
    coLorHexa,
    cpu,
    storage,
    price,
  });
};

const deleteMobilePhone = (id) => {
  console.log("User's id: ", id);
  return axios.delete("/api/mobile/", {
    ...id,
  });
};

const getOne = (id) => {
  return axios.get(`/api/product/get/one/${id}`);
};

export { getAllMobilePhone, createMobilePhone, deleteMobilePhone, getOne };
