const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getAllCustomer,
  getInforLogin,
} = require("../controller/customerController");

router.route("/register").post(createCustomer);
router.route("/get/list").get(getAllCustomer);
router.route("/login").get(getInforLogin);

module.exports = router;
