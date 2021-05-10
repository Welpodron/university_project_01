const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const getEmployees = require("./middleware/getEmployees");
const setEmployee = require("./middleware/setEmployee");
const moveEmployees = require("./middleware/moveEmployees");
const removeEmployees = require("./middleware/removeEmployees");

router.get("/", getEmployees);
router.post("/", upload.none(), setEmployee);
router.patch("/", upload.none(), moveEmployees);
router.delete("/", upload.none(), removeEmployees);

module.exports = router;
