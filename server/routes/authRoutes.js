const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post("/register",authController.register);
//POST /api/auth/login
// router.post("/login", authController.login);
// //GET /api/auth/profile
// router.get("/profile", authController.getprofile);

module.exports = router;