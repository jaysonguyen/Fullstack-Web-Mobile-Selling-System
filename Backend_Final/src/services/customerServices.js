const sql = require("mssql");
const config = require("../config/configDatabase");

const createNewCustomer = async (name, phoneNumber, dob, password, email) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(
      `exec sp_insert_customer N'${name}', '${phoneNumber}', ${1}, '${dob}', '${password}', '${email}'`
    );
    poolConnection.close();

  } catch (error) {
    console.log("Create new mobile error: " + error);
    return{
      EM: 'Error from service',
      EC: -1,
      DT: ''
    }
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

const getInforLoginCustomer = async () => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.request().query("EXEC sp_get_login_inforcustomer");
    poolConnection.close();
    if(data) {
      return {
        EM: 'Get infor login success',
        EC: 1,
        DT: data.recordset
      };
    } else {
      return {
        EM: 'Get infor login success',
        EC: 1,
        DT: []
      };
    }
  } catch(error) {
    console.log(error);
    return {
     
        EM: 'Get infor login failed',
        EC: -1,
        DT: ''
    }
  }
}

module.exports = { createNewCustomer, getCustomerList, getInforLoginCustomer};
