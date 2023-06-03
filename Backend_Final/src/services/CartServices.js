const sql = require("mssql/msnodesqlv8");
const config = require("../config/configDatabase");

const readCart = async (email) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_get_all_item_cart '${email}'`);
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

const insertCart = async (image, name, price, hw, cl, emailCus) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(
        `exec sp_insert_cart '${image}', '${name}', ${price}, '${hw}', '${cl}', '${emailCus}';`
      );
    poolConnection.close();
    if (data) {
      return {
        EM: "Insert data success",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Insert data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Insert data failed",
      EC: -1,
      DT: "",
    };
  }
};

const deleteOne = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_delete_cart ${id}`);
    poolConnection.close();
    if (data) {
      return {
        EM: "delete data success",
        EC: 1,
        DT: data.recordset,
      };
    } else {
      return {
        EM: "delete data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "delete data failed",
      EC: -1,
      DT: "",
    };
  }
};

const deleteAll = async (email) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_delete_all_cart '${email}'`);
    poolConnection.close();
    if (data) {
      return {
        EM: "delete data success",
        EC: 1,
        DT: data.recordset,
      };
    } else {
      return {
        EM: "delete data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "delete data failed",
      EC: -1,
      DT: "",
    };
  }
};

module.exports = {
  readCart,
  insertCart,
  deleteOne,
  deleteAll,
};
