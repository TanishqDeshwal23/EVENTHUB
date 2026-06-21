const Booking = require("../models/Booking");
const Event = require("../models/Event");

const getDashboardStats = async (req, res) => {
  try {

    const events = await Event.find({
      organizer: req.user._id
    });

    const eventIds = events.map(
      event => event._id
    );

    const bookings = await Booking.find({
      event: { $in: eventIds }
    });

    const totalRevenue = bookings.reduce(
      (sum, booking) =>
        sum + booking.totalAmount,
      0
    );

    res.json({
      totalEvents: events.length,
      totalBookings: bookings.length,
      totalRevenue
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const updateEvent = async (req, res) => {

  try {

    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (
      event.organizer.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    event.title =
      req.body.title || event.title;

    event.description =
      req.body.description ||
      event.description;

    event.category =
      req.body.category ||
      event.category;

    event.venue =
      req.body.venue || event.venue;

    event.ticketPrice =
      req.body.ticketPrice ||
      event.ticketPrice;

    await event.save();

    res.json(event);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getRevenueByEvent = async (req, res) => {

  try {

    const events = await Event.find({
      organizer: req.user._id
    });

    const chartData = [];

    for (const event of events) {

      const bookings =
        await Booking.find({
          event: event._id
        });

      const revenue =
        bookings.reduce(
          (sum, booking) =>
            sum + booking.totalAmount,
          0
        );

      chartData.push({
        title: event.title,
        revenue
      });

    }

    res.json(chartData);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getRecentBookings = async (req, res) => {

  try {

    const events = await Event.find({
      organizer: req.user._id
    });

    const eventIds = events.map(
      event => event._id
    );

    const bookings =
      await Booking.find({
        event: {
          $in: eventIds
        }
      })
      .populate(
        "user",
        "name email"
      )
      .populate(
        "event",
        "title"
      )
      .sort({
        createdAt: -1
      })
      .limit(10);

    res.json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getEventInsights = async (req, res) => {

  try {

    const events = await Event.find({
      organizer: req.user._id
    });

    const insights = [];

    for (const event of events) {

      const bookings =
        await Booking.find({
          event: event._id
        });

      const totalBookings =
        bookings.reduce(
          (sum, booking) =>
            sum + booking.quantity,
          0
        );

      const totalRevenue =
        bookings.reduce(
          (sum, booking) =>
            sum + booking.totalAmount,
          0
        );

      const occupancy =
        event.totalSeats > 0
          ? (
              (totalBookings /
                event.totalSeats) *
              100
            ).toFixed(0)
          : 0;

      insights.push({

        eventId:
          event._id,

        totalBookings,

        totalRevenue,

        occupancy

      });

    }

    res.json(insights);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getDashboardStats,
  getRevenueByEvent,
  updateEvent,
  getRecentBookings,
  getEventInsights
};