const express = require("express");

const router = express.Router();

const {
    createBooking,
    getMyBookings,
    getEventBookings,
    deleteBooking
} = require("../controllers/bookingController");

const {
    protect
} = require("../middleware/authMiddleware");

router.post(
    "/create",
    protect,
    createBooking
);

router.get(
    "/my-bookings",
    protect,
    getMyBookings
);
router.get(
  "/event/:eventId",
  protect,
  
  getEventBookings
);

router.delete(
  "/:id",
  protect,
  deleteBooking
);

module.exports = router;