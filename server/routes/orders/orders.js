const express = require("express");
const router = express.Router();

const getOrders = require("./middleware/getOrders");

router.get("/", getOrders);

module.exports = router;
