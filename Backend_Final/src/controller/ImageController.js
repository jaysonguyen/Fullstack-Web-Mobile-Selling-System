const {
  readImage,
  addImage,
  removeImage,
  editImage,
} = require("../services/imageServices");

const getImage = async (req, res) => {
  try {
    const data = await readImage();
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

const createImage = async (req, res) => {
  try {
    const { imageLink, isValid, desc, idProduct, idColor } = req.body;
    const data = await addImage(imageLink, isValid, desc, idProduct, idColor);
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
const deleteImage = async (req, res) => {
  try {
    let data = await removeImage(req.params.id);
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

const updateImage = async (req, res) => {
  try {
    const { imageLink, isValid, desc, idProduct, idColor } = req.body;
    const id = req.params.id;
    const data = await editImage(
      id,
      imageLink,
      isValid,
      desc,
      idProduct,
      idColor
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

module.exports = { getImage, createImage, deleteImage, updateImage };
