const sql = require("mssql");
const config = require("../config/configDatabase");

const getAllMobile = async () => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection
      .request()
      .query("EXEC sp_get_product_name_price");
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

const createOneMobile = async (
  name,
  desc,
  id_type,
  product_model,
  is_valid,
  brand
) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_insert_product N'${name}', N'${desc}', ${id_type}, '${product_model}',${is_valid},'${brand}'`
    );
    poolConnection.close();
    if (data) {
      return {
        EM: "Create success from services",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Create success services but empty",
        EC: 1,
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

const deleteMobile = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`EXEC sp_delete_product ${id}`);
    poolConnection.close();
  } catch (error) {
    console.log("Delete new mobile error: " + error);
  }
};

const updateMobile = async (id, name, desc, id_type, is_valid) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_update_product ${id}, '${name}', N'${desc}', ${id_type}, ${is_valid}`
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

const getOneMobile = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec get_one_product_infor '${id}'`);
    poolConnection.close();
    if (data) {
      return {
        EM: "Get data succcess",
        EC: 1,
        DT: data.recordset,
      };
    } else {
      return {
        EM: "Get data failed",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("Get one user failed" + error);
    return {
      EM: "Get data failed",
      EC: -1,
      DT: "",
    };
  }
};

module.exports = {
  getAllMobile,
  createOneMobile,
  deleteMobile,
  updateMobile,
  getOneMobile,
};
