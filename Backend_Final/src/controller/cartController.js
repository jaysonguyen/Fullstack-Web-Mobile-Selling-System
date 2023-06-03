const {
  readCart,
  insertCart,
  deleteOne,
  deleteAll,
} = require("../services/CartServices");

const getCart = async (req, res) => {
  try {
    const email = req.params.id;
    const data = await readCart(email);
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

const rmOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await deleteOne(id);
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

const rmAll = async (req, res) => {
  try {
    const email = req.params.id;
    const data = await deleteAll(email);
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

const addCart = async (req, res) => {
  try {
    console.log(req.body);
    const { image, name, price, hw, cl, emailCus } = req.body;
    const data = await insertCart(image, name, price, hw, cl, emailCus);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = { getCart, addCart, rmOne, rmAll };
