const express = require("express");
const router = express.Router();
const { About } = require("../controllers/About/AboutController");

router.post("/", About);

module.exports = router;
