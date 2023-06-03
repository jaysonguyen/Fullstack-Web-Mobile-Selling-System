const sql = require("mssql/msnodesqlv8");
const config = require("../config/configDatabase");

console.log("Accessories...");

const Getallaccess = async () => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.request().query("Select* from ACCESSORY");
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

const Createaccess = async ( price,name,brand) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`exec sp_insert_accessory ${price}, N'${name}', N'${brand}'`)
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

const Deleteaccess = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`Delete from accessory where id_accessory like ${id}`);
    poolConnection.close();
  } catch(error) {
    console.log("Delete new staff error: " + error)
  }
};

const Updateaccess = async (id,price,name,brand) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`UPDATE accessory SET price='${price}', accessory_name='${name}',brand='${brand}' WHERE id_accessory like '${id}'`);
    poolConnection.close();
  } catch(error) {
    console.log("Update access error", error);
  }
};

const Getoneaccess = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(`SELECT* FROM accessory WHERE id_accessory like '${id}'`)
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
    console.log("Get one accessory failed" + error);
    return {
      EM: "Get data failed",
      EC: -1,
      DT: "",
    }
  }
}
module.exports = { Getallaccess,Createaccess,Deleteaccess,Updateaccess,Getoneaccess};
