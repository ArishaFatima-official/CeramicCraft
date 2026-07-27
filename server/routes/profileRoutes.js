const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authmiddleware = require("../middleware/auth");
const validate = require('../middleware/validate');

router.use(authmiddleware);
router.get("/", profileController.getprofile);
router.put("/", profileController.updateprofile);
router.put("/change-password",validate.validate(["currentPassword", "newPassword"]), profileController.changepassword);

module.exports = router;