const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authmiddleware = require('../middleware/auth');
router.post("/register",authController.register);
//POST /api/auth/login
router.post("/login", authController.login);
// //GET /api/auth/profile
 router.get("/profile",authmiddleware, authController.getprofile);

module.exports = router;