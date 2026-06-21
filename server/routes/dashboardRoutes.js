const express = require("express");
const router = express.Router();

const {
  protect
} = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getRevenueByEvent,
  getRecentBookings,
  getEventInsights,
} = require("../controllers/dashboardController");

const authorize = require("../middleware/roleMiddleware");

// Dashboard Statistics
router.get(
  "/stats",
  protect,
  authorize("organizer"),
  getDashboardStats
);

// Revenue by Event
router.get(
  "/revenue-chart",
  protect,
  authorize("organizer"),
  getRevenueByEvent
);

router.get(
  "/recent-bookings",
  protect,
  getRecentBookings
);

router.get(
  "/event-insights",
  protect,
  getEventInsights
);

module.exports = router;