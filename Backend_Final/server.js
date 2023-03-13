const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
//const errorHandler = require("./src/middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 8080

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(errorHandler);

app.use("/api/mobile/", require("./src/routes/mobileApi"));

app.listen(PORT, () => {
  console.log("App running on port: " + PORT);
});
