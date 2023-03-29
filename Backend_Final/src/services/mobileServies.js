const sql = require("mssql");
const config = require("../config/configDatabase");

console.log("product...");

const getAllMobile = async () => {
  try {
    const poolConnection = await sql.connect(config);
    console.log("Reading rows from the Table...");
    let data = await poolConnection.request().query("Select* from product");
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

const createOneMobile = async (name, price, desc, id_type, product_model,is_valid,base_hardware_conf) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`exec sp_insert_product N'${name}', ${price}, N'${desc}', ${id_type}, '${product_model}','${is_valid}','${brand},'${base_hardware_conf}'`)
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
    console.log("Create new product error: " + error);
    return {
      EM: 'Create success',
      EC: 1,
      DT: ''
    } 
  }
};

const deleteMobile = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`Delete from PRODUCT where ID_PRODUCT like ${id}`);
    poolConnection.close();
  } catch(error) {
    console.log("Delete new mobile error: " + error)
  }
};

const updateMobile = async (id, name, price, desc, id_type, product_model,is_valid,brand,base_hardware_conf) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`UPDATE product SET product_name = '${name}', price='${price}',product_desc='${desc}',id_type_product='${id_type}',product_model_no='${product_model}',is_valid ='${is_valid}',brand='${brand},base_hardware_configuration='${base_hardware_conf}' WHERE id_product like '${id}' `);
    poolConnection.close();
  } catch(error) {
    console.log("Update product error", error);
  }
};

const getOneMobile = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(`SELECT* FROM PRODUCT WHERE ID_PRODUCT like '${id}'`)
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

module.exports = { getAllMobile, createOneMobile, deleteMobile, updateMobile, getOneMobile};
