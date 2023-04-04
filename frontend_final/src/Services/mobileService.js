import axios from "../setup/axios";

const getAllMobilePhone = () => {
  return axios.get(`/api/mobile`);
};

const createMobilePhone = (userData) => {
  console.log("User data: >>>>>", userData);
  return axios.post("/api/mobile", {
    ...userData,
  });
};

const deleteMobilePhone = (id) => {
  console.log("User's id: ", id);
  return axios.delete("/api/mobile/", {
    ...id,
  });
}

export { getAllMobilePhone, createMobilePhone, deleteMobilePhone};
