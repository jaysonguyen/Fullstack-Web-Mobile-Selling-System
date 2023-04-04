const sql = require("mssql");
const config = require("../config/configDatabase");

console.log("Starting...");

const getAllStaff = async () => {
  try {
    const poolConnection = await sql.connect(config);
    console.log("Reading rows from the Table...");
    let data = await poolConnection.request().query("Select* from employee");
    poolConnection.close();
    if (data) {
      return {
        EM: "Get data success",
        EC: 1,
        DT: data.recordset,
      };
    } else {
      return {
        EM: "Get data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Get data failed",
      EC: -1,
      DT: "",
    };
  }
};

const createOneStaff = async ( name, phone, addr, persionid,email) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`exec sp_insert_employee N'${name}', '${phone}', N'${addr}', '${persionid}','${email}'`)
    poolConnection.close();
    if(data) {
      return {
        EM: 'Create success',
        EC: 1,
        DT: []
      }
    } else {
      return {
        EM: 'Create success',
        EC: 1,
        DT: []
      }
    }
  } catch (error) {
    console.log("Create new staff error: " + error);
    return {
      EM: 'Create success',
      EC: 1,
      DT: ''
    } 
  }
};

const DeleteOneStaff = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`Delete from employee where id_employee like ${id}`);
    poolConnection.close();
  } catch(error) {
    console.log("Delete new staff error: " + error)
  }
};

const UpdateStaff = async (id, name, phonenumber, addr, persionid, email) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`UPDATE employee SET EMPLOYEE_NAME = '${name}', PHONE_NUMBER='${phonenumber}',EMPLOYEE_ADDRESS='${addr}',PERSON_ID='${persionid}',EMAIL='${email}' WHERE ID_employee like '${id}' `);
    poolConnection.close();
  } catch(error) {
    console.log("Update product error", error);
  }
};

const GetStaffbyID = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(`SELECT* FROM employee WHERE id_employee like '${id}'`)
    poolConnection.close();
    if(data) {
      return {
        EM: "Get data succcess",
        EC: 1,
        DT: data.recordset,
      }
    } else {
      return {
        EM: "Get data succcess",
        EC: 1,
        DT: [],
      }
    }
  } catch(error) {
    console.log("Get one user failed" + error);
    return {
      EM: "Get data failed",
      EC: -1,
      DT: "",
    }
  }
}

module.exports = { getAllStaff, createOneStaff, DeleteOneStaff, UpdateStaff, GetStaffbyID};
