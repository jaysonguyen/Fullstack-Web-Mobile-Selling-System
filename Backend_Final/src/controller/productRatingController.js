const {
  readRating,
  addRating,
  removeRating,
  editRating,
} = require("../services/ratingProductServices");

const getRating = async (req, res) => {
  try {
    const data = await readRating();
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

const createRating = async (req, res) => {
  try {
    const { point, comment, idProduct } = req.body;
    const data = await addRating(point, comment, idProduct);
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
const deleteRating = async (req, res) => {
  try {
    let data = await removeRating(req.params.id);
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

const updateRating = async (req, res) => {
  try {
    const { point, comment } = req.body;
    const id = req.params.id;
    const data = await editRating(id, point, comment);
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

module.exports = { getRating, createRating, deleteRating, updateRating };
