const express = require("express");
const router = express.Router();
const cartController= require("../controllers/cartController");
const authmiddleware = require("../middleware/auth");
const validate = require('../middleware/validate');

router.use(authmiddleware);
router.get("/", cartController.getcart);
router.post("/",validate.validate(["product_id", "quantity"]), cartController.addtocart);
router.put("/:id", cartController.updatecart);
router.delete("/:id", cartController.deletecartItem);

module.exports = router;