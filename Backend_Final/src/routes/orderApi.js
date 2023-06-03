const express = require("express");
const router = express.Router();
const {
  createOrder,
  paymentBill,
  updateBillStatus,
  getBillByEmail,
} = require("../controller/orderController");

router.route("/").post(createOrder);
router.route("/bymail/:id").get(getBillByEmail);
router.route("/online/payment/").post(paymentBill);
router.route("/update/status").put(updateBillStatus);

module.exports = router;
