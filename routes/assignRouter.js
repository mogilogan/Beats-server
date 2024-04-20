const express = require("express");
const router = express.Router();
const { Check } = require("../controllers/Assign/CheckController");
const { Assign } = require("../controllers/Assign/AssignController");



router.post("/", Assign);
router.post("/check", Check);

module.exports = router;
