const express = require("express");
const router = express.Router();
const { createOrder } = require("../controller/orderController");

router.route("/create").post(createOrder);

module.exports = router;
