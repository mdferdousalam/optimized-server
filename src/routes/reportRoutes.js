const express = require("express");
const reportController = require("../controllers/reportController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/donor/:donorId", authMiddleware, reportController.getDonorReport);
router.get("/dates", authMiddleware, reportController.getDateRangeReport);

module.exports = router;
