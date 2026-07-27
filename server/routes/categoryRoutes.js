const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authmiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');

router.get("/",authmiddleware,categoryController.getcategory);
router.get("/:id",authmiddleware, categoryController.getcategorybyid);
router.post("/",validate.validate(["name"]),authmiddleware,authorize("admin"),categoryController.addcategory );
router.put("/:id",authmiddleware,authorize("admin"),categoryController.updatecategory );
router.delete("/:id",authmiddleware,authorize("admin"),categoryController.deletecategory );

module.exports = router;