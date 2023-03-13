const sql = require("mssql");
const config = require("../config/configDatabase");

console.log("Starting...");

const getAllMobile = async () => {
  try {
    const poolConnection = await sql.connect(config);
    console.log("Reading rows from the Table...");
    let data = await poolConnection.request().query("Select* from mobile");
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

const createOneMobile = async (id, name) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(
      `Insert into mobile (MaMB, nameMB) values('${id}', '${name}')`
    );
    poolConnection.close();
  } catch (error) {
    console.log("Create new mobile error: " + error);
  }
};

const deleteMobile = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`Delete from mobile where MaMB like ${id}`);
    poolConnection.close();

  } catch(error) {
    console.log("Delete new mobile error: " + error)
  }
};

const updateMobile = async (id, name) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`UPDATE mobile SET nameMB = '${name}' WHERE MaMB like '${id}' `);
    poolConnection.close();
  } catch(error) {
    console.log("Update mobile error", error);
  }
};

const getOneMobile = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(`SELECT* FROM mobile WHERE MaMB like '${id}'`)
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

module.exports = { getAllMobile, createOneMobile, deleteMobile, updateMobile, getOneMobile};
