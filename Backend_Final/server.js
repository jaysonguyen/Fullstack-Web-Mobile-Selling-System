const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
//const errorHandler = require("./src/middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(errorHandler);

app.use("/api/product/", require("./src/routes/productApi"));
app.use("/api/color/", require("./src/routes/colorApi"));
app.use("/api/color/product", require("./src/routes/colorProductApi"));
app.use("/api/image/product", require("./src/routes/ImageApi"));
app.use("/api/type/product", require("./src/routes/producTypeApi"));
app.use("/api/hardware/", require("./src/routes/hardwareApi"));
app.use("/api/rating/product", require("./src/routes/productRating"));
app.use("/api/accessories/", require("./src/routes/accessoriesApi"));
app.use("/api/order/", require("./src/routes/orderApi"));

app.use("/api/customer/", require("./src/routes/customerApi"));

app.use("/api/staff/", require("./src/routes/StaffApi"));

app.use("/api/voucher/", require("./src/routes/voucherApi"));

app.use("/api/slider/", require("./src/routes/sliderApi"));

// admin

app.use("/api/orderdetail/", require("./src/routes/orderDetailApi"));

app.use(
  bodyParser.json({
    limit: "10000mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "100000mb",
    parameterLimit: 1000000,
    extended: true,
  })
);

app.use;
app.listen(PORT, () => {
  console.log("App running on port: " + PORT);
});
