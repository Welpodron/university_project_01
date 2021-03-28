const express = require("express");
const router = express.Router();

const getStatistics = require("./middleware/getStatistics");

router.get("/", getStatistics);

module.exports = router;
