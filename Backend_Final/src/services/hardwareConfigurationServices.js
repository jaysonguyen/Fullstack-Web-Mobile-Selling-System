const sql = require("mssql");
const config = require("../config/configDatabase");

const readHardware = async () => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection
      .request()
      .query("select* from hardware_configuration");
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

const readOneHw = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection
      .request()
      .query(`exec sp_get_hardware_byId ${id}`);
    poolConnection.close();
    if (data) {
      return {
        EM: "Get data success",
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
    console.log(error);
    return {
      EM: "Get data failed",
      EC: -1,
      DT: "",
    };
  }
};

const addHardware = async (
  cpu,
  storage,
  extension,
  connect,
  screen,
  id_product,
  price
) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(
      `exec sp_insert_hardware_configuration N'${cpu}', N'${storage}', N'${extension}', N'${connect}', N'${screen}', ${id_product}, ${price}`
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

const removeHardware = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`EXEC sp_delete_hardware ${id}`);
    poolConnection.close();
  } catch (error) {
    console.log("Delete new mobile error: " + error);
  }
};

const editHardware = async (
  id,
  cpu,
  storage,
  extension,
  connect,
  screen,
  id_product,
  price
) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_update_hardware ${id}, N'${cpu}', '${storage}', N'${extension}', N'${connect}', N'${screen}', ${id_product}, ${price}`
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
  readHardware,
  addHardware,
  removeHardware,
  editHardware,
  readOneHw,
};
