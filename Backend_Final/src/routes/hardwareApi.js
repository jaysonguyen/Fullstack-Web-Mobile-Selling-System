const express = require("express");
const router = express.Router();
const {
  getHardware,
  createHardware,
  deleteHardware,
  updateHardware,
  getOneHw,
} = require("../controller/hardwareController");

router.route(`/get`).get(getHardware);
router.route(`/create`).post(createHardware);
router.route(`/delete/:id`).delete(deleteHardware);
router.route(`/update/:id`).put(updateHardware);
router.route(`/get/one/:id`).get(getOneHw);

module.exports = router;
