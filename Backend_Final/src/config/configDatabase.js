const config = {
    user: "jaysonguyendb", // better stored in an app setting such as process.env.DB_USER
    password: "Thanhnguyen1", // better stored in an app setting such as process.env.DB_PASSWORD
    server: "jaysonguyendb.database.windows.net", // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: "test", // better stored in an app setting such as process.env.DB_NAME
    authentication: {
      type: "default",
    },
    options: {
      encrypt: true,
    },
};

module.exports = config;