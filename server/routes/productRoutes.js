const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authmiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');


router.get("/",authmiddleware,productController.getproduct);
router.get("/:id",authmiddleware, productController.getproductbyid);
router.post("/",authmiddleware,authorize("admin"),productController.addproduct );
router.put("/:id",authmiddleware,authorize("admin"),productController.updateproduct );
router.delete("/:id",authmiddleware,authorize("admin"),productController.deleteproduct);

module.exports = router;
