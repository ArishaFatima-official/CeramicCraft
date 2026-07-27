const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authmiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require("../middleware/validate");

router.post("/register",validate.validateRegister, authController.register);
router.post("/login",validate.validateLogin, authController.login);
 router.get("/profile",authmiddleware, authController.getprofile);

 router.get(
    "/admin-test",
    authmiddleware,
    authorize("customer"),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome customer!"
        });
    }
);
module.exports = router;