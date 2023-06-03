const sql = require("mssql/msnodesqlv8");
const config = require("../config/configDatabase");

console.log("Slider...");

const Getallslider = async () => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.request().query("exec sp_get_slider");
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
      EM: 'Error from server',
      EC: 1,
      DT: ''
    } 
  }
};

const Deleteslider = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`exec sp_delete_slider ${id}`);
    poolConnection.close();
  } catch(error) {
    console.log("Delete new slider error: " + error)
  }
};

const Updateslider = async (id,link,name,status) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`exec sp_update_slider ${id}, '${link}', ${status}`);
    poolConnection.close();
  } catch(error) {
    console.log("Update slider error", error);
  }
};

const Getoneslider = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(`exec sp_delete_slider '${id}'`)
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
