const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authmiddleware = require("../middleware/auth");
const authorize = require('../middleware/authorize');
router.use(authmiddleware);

router.get("/", orderController.getorders);
router.get("/:id",orderController.getorderbyid);
router.post("/", orderController.placeorder);
router.put("/:id",authorize('admin'),orderController.updateorderstatus);

module.exports = router;