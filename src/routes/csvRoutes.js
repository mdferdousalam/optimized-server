const express = require("express");
const csvController = require("../controllers/csvController");
const authMiddleware = require("../middlewares/auth");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  csvController.uploadCSV
);

module.exports = router;
