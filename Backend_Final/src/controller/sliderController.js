
const { Getallslider, Createslider, Deleteslider, Updateslider, Getoneslider } = require("../services/sliderServices"); // import file 

const getallslider = async (req, res) => {
  try {
    const data = await Getallslider();
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

const createslider = async (req, res) => {
  try {
    const {image_link,name_image,image_status} = req.body
    const data = await Createslider(price,accessory_name);
    return res.status(201).json({
      EM: "Create success",
      EC: 1,
      DT: "",
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
const deleteslider = async (req, res) => {
  try {
    const data = await Deleteslider(req.body.id_promotion);
    return res.status(203).json({
      EM: "Delete success",
      EC: 1,
      DT: ""
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(data);
  }
};

const updateslider = async (req, res) => {
  try {
    const data = await Updateslider(req.body.id_slider,req.body.image_link,req.body.name_image,req.body.image_status);
    return res.status(200).json({
      EM: "Update success",
      EC: 1,
      DT: data,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json(data);
  }
}
const getoneslider = async (req, res) => {
  try {
    const data = await Getoneslider(req.body.id_slider);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json(data);
  }
}
module.exports = { getallslider, createslider, deleteslider, updateslider, getoneslider };
