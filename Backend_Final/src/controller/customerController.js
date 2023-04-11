const {
  createNewCustomer,
  getCustomerList,
  getInforLoginCustomer,
  checkLogin,
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
    let data = await createNewCustomer(
      customer_name,
      phone_number,
      date_of_birth,
      customer_password,
      email
    );
    if (data && data.EC != -1) {
      return res.status(201).json({
        EM: data.EM,
        EC: 1,
        DT: "",
      });
    } else {
      return res.status(201).json({
        EM: data.EM,
        EC: data.EC,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Create account failed",
      EC: data.EC,
    });
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

const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const data = await checkLogin(email, password);
    if (data && data.EC != -1) {
      console.log("duoi neeee", data);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
      });
    }
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
    });
  }
};

module.exports = {
  createCustomer,
  getAllCustomer,
  getInforLogin,
  loginCustomer,
};
