const express = require("express");
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
  deleteEvent,
  updateEvent
} = require("../controllers/eventController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post(
    "/create",
    protect,
    authorize("organizer"),
    createEvent
);

router.get(
    "/all",
    getAllEvents
);

router.get(
  "/my-events",
  protect,
  authorize("organizer"),
  getMyEvents
);
router.put(
  "/:id",
  protect,
  authorize("organizer"),
  updateEvent
);
router.delete(
  "/:id",
  protect,
  authorize("organizer"),
  deleteEvent
);
router.get(
    "/:id", getEventById
);



module.exports = router;