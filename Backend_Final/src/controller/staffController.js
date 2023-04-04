const { getAllStaff, CreateOneStaff, DeleteOneStaff, UpdateStaff, GetStaffbyID } = require("../services/StaffServices"); // import file 

const getstaff = async (req, res) => {
  try {
    const data = await getAllStaff();
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

const createstaff = async (req, res) => {
  try {
    const {EMPLOYEE_NAME, PHONE_NUMBER, EMPLOYEE_ADDRESS, PERSON_ID,EMAIL} = req.body
    const data = await CreateOneStaff(EMPLOYEE_NAME, PHONE_NUMBER,EMPLOYEE_ADDRESS, PERSON_ID,EMAIL);
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
const deletestaff = async (req, res) => {
  try {
    const data = await DeleteOneStaff(req.body.id_employee);
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

const updatestaff = async (req, res) => {
  try {
    const data = await UpdateStaff(req.body.ID_EMPLOYEE, req.body.EMPLOYEE_NAME,req.body.PHONE_NUMBER,req.body.EMPLOYEE_ADDRESS,req.body.PERSON_ID,req.body.EMAIL);
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

const getstaffbyid = async (req, res) => {
  try {
    const data = await GetStaffbyID(req.params.id);
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
module.exports = { getstaff, createstaff, deletestaff, updatestaff, getstaffbyid };
