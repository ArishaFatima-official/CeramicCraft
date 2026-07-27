const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authmiddleware = require("../middleware/auth");

router.use(authmiddleware);
router.get("/", profileController.getprofile);
router.put("/", profileController.updateprofile);
router.put("/change-password", profileController.changepassword);

module.exports = router;