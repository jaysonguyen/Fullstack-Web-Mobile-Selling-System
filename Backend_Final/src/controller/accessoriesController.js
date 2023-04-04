
const { Getallaccess, Createaccess, Deleteaccess, Updateaccess, Getoneaccess } = require("../services/accessoriesServices"); // import file 

const getallaccess = async (req, res) => {
  try {
    const data = await Getallaccess();
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

const createaccess = async (req, res) => {
  try {
    const {price,accessory_name,brand} = req.body
    const data = await Createaccess(price,accessory_name,brand);
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
const deleteaccess = async (req, res) => {
  try {
    const data = await Deleteaccess(req.body.id_accessory);
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

const updateaccess = async (req, res) => {
  try {
    const data = await Updateaccess(req.body.id_accessory,req.body.accessory_price,req.body.accessory_name,req.body.brand);
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

const getoneaccess = async (req, res) => {
  try {
    const data = await Getoneaccess(req.params.id);
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
module.exports = { getallaccess, createaccess, deleteaccess, updateaccess, getoneaccess };
