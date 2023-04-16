const {
  readHardware,
  addHardware,
  removeHardware,
  editHardware,
  readOneHw,
} = require("../services/hardwareConfigurationServices");

const getHardware = async (req, res) => {
  try {
    const data = await readHardware();
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

const getOneHw = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await readOneHw(id);
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

const createHardware = async (req, res) => {
  try {
    const { cpu, storage, extension, connect, screen, id_product, price } =
      req.body;
    const data = await addHardware(
      cpu,
      storage,
      extension,
      connect,
      screen,
      id_product,
      price
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
const deleteHardware = async (req, res) => {
  try {
    await removeHardware(req.params.id);
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

const updateHardware = async (req, res) => {
  try {
    const { cpu, storage, extension, connect, screen, id_product, price } =
      req.body;
    const id = req.params.id;
    const data = await editHardware(
      id,
      cpu,
      storage,
      extension,
      connect,
      screen,
      id_product,
      price
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
  getHardware,
  createHardware,
  deleteHardware,
  updateHardware,
  getOneHw,
};
