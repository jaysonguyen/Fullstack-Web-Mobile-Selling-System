const sql = require("mssql");
const config = require("../config/configDatabase");

const readImage = async () => {
  try {
    const poolConnection = await sql.connect(config);
    console.log("Reading rows from the Table...");
    let data = await poolConnection
      .request()
      .query("exec sp_get_image_product");
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

const addImage = async (imageLink, isValid, desc, idProduct, idColor) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_insert_image '${imageLink}', ${isValid}, '${desc}', ${idProduct}, ${idColor}`
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

const removeImage = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(
      `exec sp_delete_image_product ${id}`
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
    console.log("Delete new Image error: " + error);
    return {
      EM: "Error from services",
      EC: -1,
      DT: "",
    };
  }
};

const editImage = async (id, imageLink, isValid, desc, idProduct, idColor) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_update_image_product ${id}, '${imageLink}', ${isValid}, '${desc}', ${idProduct}, ${idColor}`
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
  readImage,
  addImage,
  removeImage,
  editImage,
};