const sql = require("mssql");
const config = require("../config/configDatabase");

const readRating = async () => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.request().query("exec sp_get_product_rating");
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

const addRating = async (point, comment, idProduct) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_insert_product_rating ${point}, '${comment}', ${idProduct}`
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

const removeRating = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(`EXEC sp_delete_rating_product ${id}`);
    poolConnection.close();
    if(data) {
        return {
            EM: "Delete success",
            EC: 1,
            DT: ""
        }
    }
  } catch (error) {
    console.log("Delete new Rating error: " + error);
    return {
        EM: "Error from services",
        EC: -1,
        DT: ""
    }
  }
};

const editRating = async (idRating, point, comment) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_update_rating_product ${idRating}, ${point}, N'${comment}'`
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
  readRating,
  addRating,
  removeRating,
  editRating
};
