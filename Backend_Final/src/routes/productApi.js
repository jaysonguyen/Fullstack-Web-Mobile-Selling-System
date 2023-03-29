const express = require("express");
const router = express.Router();
const { getAllPtype, createOnePtype, deletePtype, updatePtype, getOnePtype } = require("../services/ptypeServices");
router.route("/findall").get(getAllPtype);
router.route("/create").post(createOnePtype);
router.route("/delete").delete(deletePtype);
router.route("/update").put(updatePtype);
router.route("/findone/:id").get(getOnePtype);
module.exports = router;
