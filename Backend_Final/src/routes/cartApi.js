const express = require("express");
const router = express.Router();

const {
  getCart,
  addCart,
  rmOne,
  rmAll,
} = require("../controller/cartController");

router.route("/:id").get(getCart);
router.route("/").post(addCart);
router.route("/:id").delete(rmOne);
router.route("/all/:id").delete(rmAll);

module.exports = router;
