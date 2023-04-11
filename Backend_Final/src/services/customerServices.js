const sql = require("mssql");
const config = require("../config/configDatabase");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkEmailExist = async (userEmail) => {
  let user = await getInforLoginCustomer();
  user.DT.find((email) => userEmail == email);

  if (user) {
    return true;
  }

  return false;
};

const createNewCustomer = async (name, phoneNumber, dob, password, email) => {
  try {
    let hashPasswordUser = hashPassword(password);
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_insert_account_customer '${hashPasswordUser}', N'${name}', '${phoneNumber}', '${dob}', '${email}'`
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

//add a new thing

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
    let data = await poolConnection.request().execute("sp_get_infor_login");
    let isCorrectPassword = false;
    poolConnection.close();
    let flag = false;
    let dataObj = {};
    const dataRe = await data.recordset;
    for (let i in dataRe) {
      if (dataRe[i].email == email) {
        dataObj = await dataRe[i];
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
      EM: "Error from services",
      EC: -1,
    };
  }
};


module.exports = {
  createNewCustomer,
  getCustomerList,
  getInforLoginCustomer,
  checkLogin,
};
