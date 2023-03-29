const {
  getAllMobile,
  createOneMobile,
  deleteMobile,
  updateMobile,
  getOneMobile,
} = require("../services/mobileServies");

const getMobile = async (req, res) => {
  try {
    const data = await getAllMobile();
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

const createMobile = async (req, res) => {
  try {
    const {
      product_name,
      product_desc,
      id_type_product,
      model_no,
      is_valid,
      brand,
    } = req.body;
    const data = await createOneMobile(
      product_name,
      product_desc,
      id_type_product,
      model_no,
      is_valid,
      brand
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
const deleteMB = async (req, res) => {
  try {
    await deleteMobile(req.params.id);
    return res.status(203).json({
      EM: "Delete sucess",
      EC: 1,
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

const updateMB = async (req, res) => {
  const id = req.params.id;
  try {
    await updateMobile(
      id,
      req.body.product_name,
      req.body.product_desc,
      req.body.id_type_product,
      req.body.is_valid
    );
    return res.status(200).json({
      EM: "Update success",
      EC: 1,
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

const getMobileById = async (req, res) => {
  try {
    const data = await getOneMobile(req.params.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EM: "Error from server", EC: -1, DT: "" });
  }
};
module.exports = { getMobile, createMobile, deleteMB, updateMB, getMobileById };
