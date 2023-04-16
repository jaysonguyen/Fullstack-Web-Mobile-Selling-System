const { getAllListProduct } = require("../services/manageProductSer");

const getListProduct = async (req, res) => {
  try {
    const data = await getAllListProduct();
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

module.exports = { getListProduct};