const {
  createNewCustomer,
  getCustomerList,
  getInforLoginCustomer,
} = require("../services/customerServices");

const createCustomer = async (req, res) => {
  try {
    const {
      customer_name,
      phone_number, 
      date_of_birth,
      customer_password,
      email,
    } = req.body;

    console.log("check req=>>>", req.body);
    await createNewCustomer(
      customer_name,
      phone_number,
      date_of_birth,
      customer_password,
      email
    );
    return res.status(201).json({
      EM: "Create success",
      EC: 1,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(data);
  }
};

const getAllCustomer = async (req, res) => {
  try {
    const data = await getCustomerList();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const getInforLogin = async (req, res) => {
  try {
    const data = await getInforLoginCustomer();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT
    });
  } catch(error) {
    console.log(error);
    return res.status(200).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
}

module.exports = { createCustomer, getAllCustomer, getInforLogin};
