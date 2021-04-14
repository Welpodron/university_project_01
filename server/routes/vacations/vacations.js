const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();

const getVacations = require("./middleware/getVacations");
const createVacations = require("./middleware/createVacations");

router.get("/", getVacations);
router.post("/", upload.none(), createVacations);

module.exports = router;
