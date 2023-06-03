const sql = require("mssql/msnodesqlv8");
const config = require("../config/configDatabase");

const readType = async () => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.request().query("exec sp_get_product_type");
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

const addType = async (nameType, descType) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_insert_product_type N'${nameType}', N'${descType}'`
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

const removeType = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(
      `exec sp_delete_type_product ${id}`
    );
    poolConnection.close();
    if (data) {
      return {
        EM: "Delete success",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log("Delete new Type error: " + error);
    return {
      EM: "Error from services",
      EC: -1,
      DT: "",
    };
  }
};

const editType = async (id, nameType, desc) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_update_type_product ${id}, N'${nameType}', N'${desc}'`
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
  readType,
  addType,
  removeType,
  editType,
};
