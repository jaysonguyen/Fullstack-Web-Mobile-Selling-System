const { getAllPtype, createOnePtype, deletePtype, updatePtype, getOnePtype} = require("../services/ptypeServices"); // import file 

const getallptype = async (req, res) => {
  try {
    const data = await getAllPtype();
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

const createoneptype = async (req, res) => {
  try {
    const {name_product_type,product_type_desc} = req.body
    const data = await createOnePtype(name_product_type,product_type_desc);
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
const deleteptype = async (req, res) => {
  try {
    const data = await deletePtype(req.body.id_product_type);
    return res.status(203).json({
      EM: "Delete sucess",
      EC: 1,
      DT: ""
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(data);
  }
};

const updateptype = async (req, res) => {
  try {
    const data = await updatePtype(req.body.id_product_type,req.body.name_product_type,req.body.product_type_desc);
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

const getoneptype = async (req, res) => {
  try {
    const data = await getOnePtype(req.params.id);
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
module.exports = { getallptype, createoneptype, deleteptype, updateptype, getoneptype };
