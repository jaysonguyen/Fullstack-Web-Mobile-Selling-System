const sql = require("mssql/msnodesqlv8");
const config = require("../config/configDatabase");

console.log("Voucher...");

const Getallvoucher = async () => {
  try {
    const poolConnection = await sql.connect(config);
    console.log("Reading rows from the Table...");
    let data = await poolConnection.request().query("Select* from promotion");
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

const Createvoucher = async ( name,expday,startday,context,cost,is_valid) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(``)
    poolConnection.close();
    if(data) {
      return {
        EM: 'Create success',
        EC: 1,
        DT: []
      }
    } else {
      return {
        EM: 'Create success',
        EC: 1,
        DT: []
      }
    }
  } catch (error) {
    console.log("Create new staff error: " + error);
    return {
      EM: 'Create success',
      EC: 1,
      DT: ''
    } 
  }
};

const Deletevoucher = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`Delete from promotion where id_promotion like ${id}`);
    poolConnection.close();
  } catch(error) {
    console.log("Delete new staff error: " + error)
  }
};

const Updatevoucher = async (price,name) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`  `);
    poolConnection.close();
  } catch(error) {
    console.log("Update promotion error", error);
  }
};

const Getonevoucher = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(`SELECT* FROM promotion WHERE id_promotion like '${id}'`)
    poolConnection.close();
    if(data) {
      return {
        EM: "Get data succcess",
        EC: 1,
        DT: data.recordset,
      }
    } else {
      return {
        EM: "Get data succcess",
        EC: 1,
        DT: [],
      }
    }
  } catch(error) {
    console.log("Get one voucher failed" + error);
    return {
      EM: "Get data failed",
      EC: -1,
      DT: "",
    }
  }
}
module.exports = { Getallvoucher,Createvoucher,Deletevoucher,Updatevoucher,Getonevoucher};
