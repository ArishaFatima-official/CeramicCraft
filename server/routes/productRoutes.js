const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authmiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');

router.get("/",productController.getproduct);
router.get("/:id", productController.getproductbyid);
router.post("/",authmiddleware,authorize("admin"), upload.single("image"),validate.validate([
        "category_id",
        "name",
        "description",
        "price",
        "stock",
        "material",
        "color",
        "dimensions",
        "is_handmade"
    ]),productController.addproduct );
router.put("/:id",authmiddleware,authorize("admin"),productController.updateproduct );
router.delete("/:id",authmiddleware,authorize("admin"),productController.deleteproduct);

module.exports = router;
