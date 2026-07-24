const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authmiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');
router.post("/register",authController.register);
//POST /api/auth/login
router.post("/login", authController.login);
// //GET /api/auth/profile
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