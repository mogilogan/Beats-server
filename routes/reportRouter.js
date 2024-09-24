const express = require("express");
const router = express.Router();
const { fetch,add } = require("../controllers/Report/ReportController");

router.get("/all", fetch);
router.post("/add", add);

module.exports = router;
