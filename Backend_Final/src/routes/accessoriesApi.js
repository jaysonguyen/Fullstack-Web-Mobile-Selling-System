const express = require("express");
const router = express.Router();
const { getallaccess, createaccess, deleteaccess, updateaccess, getoneaccess} = require("../controller/accessoriesController");
router.route("/findall").get(getallaccess);
router.route("/create").post(createaccess);
router.route("/delete").delete(deleteaccess);
router.route("/update").put(updateaccess);
router.route("/findone/").get(getoneaccess);
module.exports = router;
