const sql = require("mssql/msnodesqlv8");
const config = require("../config/configDatabase");

const getAllListProduct = async () => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection
      .request()
      .query("exec sp_get_product_protype");
    poolConnection.close();
    if (data) {
      return {
        EM: " Get data success",
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
      EM: " Get data failed",
      EC: -1,
      DT: "",
    };
  }
};

module.exports = { getAllListProduct};