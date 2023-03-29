const sql = require("mssql");
const config = require("../config/configDatabase");

const readColor = async () => {
  try {
    const poolConnection = await sql.connect(config);
    console.log("Reading rows from the Table...");
    let data = await poolConnection.request().query("exec sp_get_color");
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

const addColor = async (name, color_hexa_code, is_valid) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_insert_color N'${name}', '${color_hexa_code}', ${is_valid}`
    );
    poolConnection.close();
    if (data) {
      return {
        EM: "Create success from services",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Create success services but empty",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    console.log("Create new product error: " + error);
    return {
      EM: "Error from serivces",
      EC: -1,
      DT: "",
    };
  }
};

const removeColor = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(`EXEC sp_delete_color ${id}`);
    poolConnection.close();
    if(data) {
        return {
            EM: "Delete success",
            EC: 1,
            DT: ""
        }
    }
  } catch (error) {
    console.log("Delete new Color error: " + error);
    return {
        EM: "Error from services",
        EC: -1,
        DT: ""
    }
  }
};

const editColor = async (id, name, color_hexa_code, is_valid) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_update_color ${id}, '${name}', '${color_hexa_code}', ${is_valid}`
    );
    poolConnection.close();
    if (data) {
      return {
        EM: "Update Success",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log("Update product error", error);
    return {
      EM: "Error from server",
      EC: -1,
      DT: "",
    };
  }
};


module.exports = {
  readColor,
  addColor,
  removeColor,
  editColor
};
