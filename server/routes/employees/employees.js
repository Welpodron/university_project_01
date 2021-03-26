const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const getEmployees = require("./middleware/getEmployees");
const setEmployee = require("./middleware/setEmployee");

router.get("/", getEmployees);
router.post("/", upload.none(), setEmployee);

module.exports = router;
