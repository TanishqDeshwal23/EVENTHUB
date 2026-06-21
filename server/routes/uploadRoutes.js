const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const {
  uploadImage
} = require("../controllers/uploadController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post(
  "/event-image",
  protect,
  authorize("organizer"),
  upload.single("image"),
  uploadImage
);

module.exports = router;