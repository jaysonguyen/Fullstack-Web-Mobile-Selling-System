const {
  createNewCustomer,
  getCustomerList,
  getInforLoginCustomer,
  checkLogin,
  getCustomerbyEmail,
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
    const data = await createNewCustomer(
      customer_name,
      phone_number,
      date_of_birth,
      customer_password,
      email
    );
    if (data && +data.EC == 1) {
      return res.status(201).json({
        EM: data.EM,
        EC: 1,
        DT: "",
      });
    }
    if (data && +data.EC != 1) {
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
    const data = await checkLogin(email, password);
    if (data && data.EC != -1) {
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

const getCusByEmail = async (req, res) => {
  try {
    const email = req.params.email
    const data = await getCustomerbyEmail(email);
    if (data && +data.EC == 1) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
    if (data && +data.EC != 1) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EM: "Error from server", EC: -1, DT: "" });
  }
};

module.exports = {
  createCustomer,
  getAllCustomer,
  getInforLogin,
  loginCustomer,
  getCusByEmail,
};
