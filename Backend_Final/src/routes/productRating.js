const express = require("express");
const router = express.Router();
const {
  getRating,
  createRating,
  deleteRating,
  updateRating,
} = require("../controller/productRatingController");

router.route("/get").get(getRating);
router.route("/create").post(createRating);
router.route("/update/:id").put(updateRating);
router.route("/delete/:id").delete(deleteRating);

module.exports = router;
