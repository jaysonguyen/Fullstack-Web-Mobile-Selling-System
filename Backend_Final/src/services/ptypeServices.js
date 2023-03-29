const sql = require("mssql");
const config = require("../config/configDatabase");

console.log("ptype...");

const getAllPtype = async () => {
  try {
    const poolConnection = await sql.connect(config);
    console.log("Reading rows from the Table...");
    let data = await poolConnection.request().query("Select* from product_type");
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

const createOnePtype = async (ptype_id,ptype_name,ptype_desc) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`insert into product_type values ('${ptype_id},N'${ptype_name}','${ptype_desc}')`)
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
    console.log("Create new type_product error: " + error);
    return {
      EM: 'Create success',
      EC: 1,
      DT: ''
    } 
  }
};

const deletePtype = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`Delete from PRODUCT_type where ID_PRODUCT_TYPE like ${id}`);
    poolConnection.close();
  } catch(error) {
    console.log("Delete new mobile error: " + error)
  }
};

const updatePtype = async (ptype_id,ptype_name,ptype_desc) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`UPDATE product_type SET name_product_type= N'${ptype_name}',product_type_desc='${ptype_desc}' where id =${ptype_id}`);
    poolConnection.close();
  } catch(error) {
    console.log("Update product_type error", error);
  }
};

const getOnePtype = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(`SELECT* FROM PRODUCT_type WHERE ID_PRODUCT_type like '${id}'`)
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
    console.log("Get one user failed" + error);
    return {
      EM: "Get data failed",
      EC: -1,
      DT: "",
    }
  }
}

module.exports = { getAllPtype, createOnePtype, deletePtype, updatePtype, getOnePtype};
