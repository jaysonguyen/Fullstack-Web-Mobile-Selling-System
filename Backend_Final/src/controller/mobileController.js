const {
  getAllMobile,
  createOneMobile,
  deleteMobile,
  updateMobile,
  getOneMobile,
} = require("../services/mobileServies"); // import file

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
    const { MaMB, nameMB } = req.body;
    if (!MaMB || !nameMB) {
      throw new Error("Error from record");
    }
    const data = await createOneMobile(MaMB, nameMB);
    return res.status(201).json({
      EM: "Create success",
      EC: 1,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(data);
  }
};

const deleteMB = async (req, res) => {
  try {
    const data = await deleteMobile(req.params.id);
    return res.status(203).json({
      EM: "Delete sucess",
      EC: 1,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(data);
  }
};

const updateMB = async (req, res) => {
  try {
    const data = await updateMobile(req.params.id, req.body.nameMB);
    return res.status(200).json({
      EM: "Update success",
      EC: 1,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(data);
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
    return res.status(500).json(data);
  }
};

module.exports = { getMobile, createMobile, deleteMB, updateMB, getMobileById };
