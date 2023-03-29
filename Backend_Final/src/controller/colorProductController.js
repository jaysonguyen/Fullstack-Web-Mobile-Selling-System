const {
  readProductColor,
  addProductColor,
  removeProductColor,
  editProductColor,
} = require("../services/colorProductServices");

const getProductColor = async (req, res) => {
  try {
    const data = await readProductColor();
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

const createProductColor = async (req, res) => {
  try {
    const { idColor, idProduct, quantity, importDate } = req.body;
    const data = await addProductColor(
      idColor,
      idProduct,
      quantity,
      importDate
    );
    if (data) {
      return res.status(201).json({
        EM: data.EM,
        EC: data.EC,
        DT: "",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};
const deleteProductColor = async (req, res) => {
  try {
    let { idColor, idProduct } = req.body;
    let data = await removeProductColor(idColor, idProduct);
    return res.status(203).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
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

const updateProductColor = async (req, res) => {
  try {
    const { idColor, idProduct, quantity, importDate } = req.body;
    const data = await editProductColor(
      idColor,
      idProduct,
      quantity,
      importDate
    );
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
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

module.exports = {
  getProductColor,
  createProductColor,
  deleteProductColor,
  updateProductColor,
};
