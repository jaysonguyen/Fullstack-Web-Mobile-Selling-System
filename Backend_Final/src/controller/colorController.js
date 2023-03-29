const {
  readColor,
  addColor,
  removeColor,
  editColor,
} = require("../services/colorServices");

const getColor = async (req, res) => {
  try {
    const data = await readColor();
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

const createColor = async (req, res) => {
  try {
    const { color_name, hexa_code, is_valid } = req.body;
    const data = await addColor(color_name, hexa_code, is_valid);
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
const deleteColor = async (req, res) => {
  try {
    let data = await removeColor(req.params.id);
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

const updateColor = async (req, res) => {
  try {
    const { color_name, hexa_code, is_valid } = req.body;
    const id = req.params.id;
    const data = await editColor(id, color_name, hexa_code, is_valid);
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

module.exports = { getColor, createColor, deleteColor, updateColor };
