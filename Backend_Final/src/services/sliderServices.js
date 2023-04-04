const sql = require("mssql");
const config = require("../config/configDatabase");

console.log("Slider...");

const Getallslider = async () => {
  try {
    const poolConnection = await sql.connect(config);
    console.log("Reading rows from the Table...");
    let data = await poolConnection.request().query("Select* from slider");
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

const Createslider = async (link,name,status) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`exec sp_insert_slider ${link}, N'${name}', N'${status}'`)
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

const Deleteslider = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`Delete from slider where id_slider like ${id}`);
    poolConnection.close();
  } catch(error) {
    console.log("Delete new slider error: " + error)
  }
};

const Updateslider = async (id,link,name,status) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`  `);
    poolConnection.close();
  } catch(error) {
    console.log("Update slider error", error);
  }
};

const Getoneslider = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(`SELECT* FROM slider WHERE id_slider like '${id}'`)
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
    console.log("Get one slider failed" + error);
    return {
      EM: "Get data failed",
      EC: -1,
      DT: "",
    }
  }
}
module.exports = { Getallslider,Createslider,Deleteslider,Updateslider,Getoneslider};
