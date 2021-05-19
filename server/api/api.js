const express = require("express");
const router = express.Router();

const phones = require("./middleware/phones");
const jobs = require("./middleware/jobs");
const departmens = require("./middleware/departmens");
const generatorEmployees = require("./middleware/generator/employees");
const pages = require("./middleware/pages");
const vacationsTypes = require("./middleware/vacationsTypes");
const moveOrders = require("./middleware/moveOrders");

const search = require("./middleware/search");

router.get("/phones", phones);
router.get("/jobs", jobs);
router.get("/departments", departmens);
router.get("/pagesAmount", pages);
router.get("/vacationsTypes", vacationsTypes);
router.get("/getMoveEmployeesOrderCategories", moveOrders);
router.get("/generator/employees", generatorEmployees);

router.get("/search", search);

module.exports = router;
