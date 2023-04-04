
const { Getallvoucher, Createvoucher, Deletevoucher, Updatevoucher, Getonevoucher } = require("../services/voucherServices"); // import file 

const getallvoucher = async (req, res) => {
  try {
    const data = await Getallvoucher();
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

const createvoucher = async (req, res) => {
  try {
    const {promotion_name,exp_day,start_time,promotion_content,promotion_cost,is_valid} = req.body
    const data = await Createvoucher(price,accessory_name);
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
const deletevoucher = async (req, res) => {
  try {
    const data = await Deletevoucher(req.body.id_promotion);
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

const updatevoucher = async (req, res) => {
  try {
    const data = await Updatevoucher(req.body.id_promotion,req.body.promotion_name,req.body.exp_date,req.body.start_exp,req.body.promotion_content,req.body.promotion_cost,req.body.is_valid);
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
const getonevoucher = async (req, res) => {
  try {
    const data = await Getonevoucher(req.params.id);
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
module.exports = { getallvoucher, createvoucher, deletevoucher, updatevoucher, getonevoucher };
