const sql = require("mssql/msnodesqlv8");
const config = require("../config/configDatabase");

const addOrder = async (id, name, phone, email, address, total, pay) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_insert_order ${id}, N'${name}', '${phone}', '${email}', N'${address}',  ${total}, ${pay}`
    );
    poolConnection.close();
    if (data) {
      return {
        EM: "Đặt hàng thành công",
        EC: 0,
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

const addOrderDetails = async (idOrder, amount, color, hw, name, image) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_insert_order_detail ${idOrder}, ${amount}, '${color}', '${hw}', N'${name}', '${image}'`
    );
    poolConnection.close();
    if (data) {
      return {
        EM: "Đặt hàng thành công",
        EC: 0,
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

const editStatus = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(`exec sp_update_bill_status '${id}'`);
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

const getOrderByEmail = async (email) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection
      .request()
      .query(`exec sp_get_order_by_email '${email}'`);
    poolConnection.close();
    if (data) {
      return {
        EM: "Tải dữ liệu thành công",
        EC: 1,
        DT: data.recordset,
      };
    } else {
      return {
        EM: "Tải dữ liệu thành công",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi dịch vụ",
      EC: -1,
      DT: "",
    };
  }
};

module.exports = {
  addOrder,
  addOrderDetails,
  editStatus,
  getOrderByEmail,
};
