const express = require("express");
const router = express.Router();
const cartController= require("../controllers/cartController");
const authmiddleware = require("../middleware/auth");

router.use(authmiddleware);
router.get("/", cartController.getcart);
router.post("/", cartController.addtocart);
router.put("/:id", cartController.updatecart);
router.delete("/:id", cartController.deletecartItem);

module.exports = router;