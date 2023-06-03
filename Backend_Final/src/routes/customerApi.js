const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getAllCustomer,
  loginCustomer,
  getInforLogin,
  getCusByEmail,
  changePass,
} = require("../controller/customerController");

router.route("/register").post(createCustomer);
router.route("/login").post(loginCustomer);
router.route("/get/list").get(getAllCustomer);
router.route("/get/login").get(getInforLogin);
router.route("/get/inforby/email/:email").get(getCusByEmail);
router.route("/change/pass/:id").put(changePass);

module.exports = router;
