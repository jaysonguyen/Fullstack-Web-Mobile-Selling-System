const express = require("express");
const router = express.Router();
const {
    getListProduct
} = require("../controller/manageProductCon");
router.route("/getall").get(getListProduct);

module.exports = router;