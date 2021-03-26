const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const login = require("./middleware/login");
const logout = require("./middleware/logout");
const check = require("./middleware/check");

router.post("/login", upload.none(), login);
router.get("/check", check);
router.get("/logout", logout);

module.exports = router;
