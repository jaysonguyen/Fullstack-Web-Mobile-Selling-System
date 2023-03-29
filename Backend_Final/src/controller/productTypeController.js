const {
  readType,
  addType,
  removeType,
  editType,
} = require("../services/productTypeServices");

const getType = async (req, res) => {
  try {
    const data = await readType();
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

const createType = async (req, res) => {
  try {
    const { nameType, descType } = req.body;
    const data = await addType(nameType, descType);
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

const deleteType = async (req, res) => {
  try {
    let data = await removeType(req.params.id);
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

const updateType = async (req, res) => {
  try {
    const { nameType, descType } = req.body;
    const id = req.params.id;
    const data = await editType(id, nameType, descType);
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

module.exports = { getType, createType, deleteType, updateType };
