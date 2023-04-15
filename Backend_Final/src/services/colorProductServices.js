const sql = require("mssql");
const config = require("../config/configDatabase");

const readProductColor = async () => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection
      .request()
      .query("exec sp_get_color_product");
    poolConnection.close();
    if (data) {
      return {
        EM: "Get data success",
        EC: 1,
        DT: data.recordset,
      };
    } else {
      return {
        EM: "Get data failed",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from services",
      EC: -1,
      DT: "",
    };
  }
};

const addProductColor = async (idColor, idProduct, quantity, importDate) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_insert_color_product ${idColor}, ${idProduct}, ${quantity}, '${importDate}'`
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

const removeProductColor = async (idColor, idProduct) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(
      `EXEC sp_delete_color_product ${idColor}, ${idProduct}`
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
    console.log("Delete new ProductColor error: " + error);
    return {
      EM: "Error from services",
      EC: -1,
      DT: "",
    };
  }
};

const editProductColor = async (idColor, idProduct, quantity, importDate) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      ` exec sp_update_color_product ${idColor}, ${idProduct}, ${quantity}, '${importDate}'`
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
  readProductColor,
  addProductColor,
  removeProductColor,
  editProductColor,
};
