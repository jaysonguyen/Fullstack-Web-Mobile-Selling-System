const sql = require("mssql");
const config = require("../config/configDatabase");

const addOrder = async (methodRe, idPro, email, hw, color) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_insert_order ${methodRe}, ${idPro}, '${email}', '${hw}', '${color}'`
    );
    poolConnection.close();
    if (data) {
      return {
        EM: "Đặt hàng thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Đặt hàng thất bại",
        EC: 0,
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
  addOrder,
};
