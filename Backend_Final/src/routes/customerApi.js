const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getAllCustomer,
  loginCustomer,
  getInforLogin,
} = require("../controller/customerController");

router.route("/register").post(createCustomer);
router.route("/login").post(loginCustomer);
router.route("/get/list").get(getAllCustomer);
router.route("/get/login").get(getInforLogin);

module.exports = router;
