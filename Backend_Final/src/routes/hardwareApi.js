const express = require("express");
const router = express.Router();
const {
  getHardware,
  createHardware,
  deleteHardware,
  updateHardware,
} = require("../controller/hardwareController");

router.route(`/get`).get(getHardware);
router.route(`/create`).post(createHardware);
router.route(`/delete/:id`).delete(deleteHardware);
router.route(`/update/:id`).put(updateHardware);

module.exports = router;




