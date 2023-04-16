const { addOrder } = require("../services/orderServices");

const createOrder = async (req, res) => {
  try {
    const { methodRe, idPro, email, hw, color } = req.body;
    const data = await addOrder(methodRe, idPro, email, hw, color);
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

module.exports = { createOrder };
