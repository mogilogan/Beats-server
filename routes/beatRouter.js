const express = require("express");
const router = express.Router();
const { Check,remove,available, update, assigned } = require("../controllers/Assign/BeatController");




router.get("/check", Check);
router.post("/remove", remove);
router.get("/available", available);
router.post("/update",update);
router.post("/assigned",assigned);

module.exports = router;
