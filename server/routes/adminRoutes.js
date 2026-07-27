const express = require("express");
const router = express.Router();

const  adminController = require("../controllers/adminController");

const authmiddleware = require("../middleware/auth");
const authorize = require("../middleware/authorize");

router.use(authmiddleware);
router.use(authorize("admin"));

router.get("/dashboard", adminController.dashboard);

module.exports = router;