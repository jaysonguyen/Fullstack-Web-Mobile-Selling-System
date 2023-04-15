const sql = require("mssql");
const config = require("../config/configDatabase");

const getAllOrderDetail = async () => {
  try {
    const poolConnection = await sql.connect(config);
    console.log("Reading rows from the table ...");
    let data = await poolConnection
      .request()
      .query("exec sp_get_all_infor_order_detail");
    poolConnection.close();
    if (data) {
      return {
        EM: "Get data order success",
        EC: 1,
        DT: data.recordset,
      };
    } else {
      return {
        EM: "Get data order success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Get data order failed",
      EC: -1,
      DT: "",
    };
  }
};





module.exports = {
    getAllOrderDetail
};