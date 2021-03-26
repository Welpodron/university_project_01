const express = require("express");
const router = express.Router();

const phones = require("./middleware/phones");
const jobs = require("./middleware/jobs");
const departmens = require("./middleware/departmens");
const generatorEmployees = require("./middleware/generator/employees");
const pages = require("./middleware/pages");

router.get("/phones", phones);
router.get("/jobs", jobs);
router.get("/departments", departmens);
router.get("/pagesAmount", pages);
router.get("/generator/employees", generatorEmployees);

module.exports = router;
