const express = require("express");
const router = express.Router();
const { getOrderDetail } = require("../controller/orderDetailController");
router.route("/getall").get(getOrderDetail);

module.exports = router;