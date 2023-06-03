const config = {
  server: 'JAYSON\\SQLEXPRESS',
  database: 'mobilePhoneSystemDB',
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true, // If your SQL Server instance uses encrypted connection
  },
};

module.exports = config;