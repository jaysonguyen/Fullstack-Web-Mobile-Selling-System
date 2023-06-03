const sql = require("mssql/msnodesqlv8");
const config = require("../config/configDatabase");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewCustomer = async (
  name,
  phoneNumber,
  dob,
  password,
  email,
  cusAddress
) => {
  try {
    let hashPasswordUser = hashPassword(password);
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_insert_customer N'${name}', '${phoneNumber}', '${dob}', '${email}', '${hashPasswordUser}', N'${cusAddress}'`
    );
    poolConnection.close();
    if (data) {
      return {
        EM: "create data success",
        EC: 1,
      };
    } else {
      return {
        EM: "create failed",
        EC: 0,
      };
    }
  } catch (error) {
    console.log("Create new mobile error: " + error);
    return {
      EM: "Error from service",
      EC: -1,
      DT: "",
    };
  }
};

const getCustomerList = async () => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.request().query("EXEC SP_GET_ALL_CUSTOMER");
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

const getCustomerbyEmail = async (email) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_get_customer_by_email '${email}'`);
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

const getInforLoginCustomer = async () => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.request().query("exec sp_get_infor_login");
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

const checkLogin = async (email, password) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.request().query("exec sp_get_infor_login");
    let isCorrectPassword = false;
    console.log(data);
    poolConnection.close();
    let dataObj = {};
    const dataRe = await data.recordset;
    for (let i in dataRe) {
      if (dataRe[i].email == email) {
        dataObj = await dataRe[i];
        console.log(dataObj);
        isCorrectPassword = bcrypt.compareSync(password, dataObj.pass);
        if (isCorrectPassword) {
          return {
            EM: "Đăng nhập thành công",
            EC: 1,
          };
        } else {
          return {
            EM: "Tài khoản hoặc mật khẩu sai vui lòng nhập lại",
            EC: -1,
          };
        }
      }
    }
    return {
      EM: "Tài khoản hoặc mật khẩu sai vui lòng nhập lại",
      EC: -1,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi dịch vụ",
      EC: -1,
    };
  }
};

const updatePass = async (email, pass) => {
  try {
    const poolConnection = await sql.connect(config);
    let hashPasswordUser = hashPassword(pass);
    let data = await poolConnection
      .request()
      .query(`exec sp_update_password '${email}', '${hashPasswordUser}'`);
    poolConnection.close();
    if (data) {
      return {
        EM: "Đổi mật khẩu thành công",
        EC: 1,
        DT: data.recordset,
      };
    } else {
      return {
        EM: "Đổi mật khẩu thất bại",
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
  createNewCustomer,
  getCustomerList,
  getInforLoginCustomer,
  checkLogin,
  getCustomerbyEmail,
  updatePass,
};
