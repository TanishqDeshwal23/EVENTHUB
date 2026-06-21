const Event = require("../models/Event");

const createEvent = async (req,res)=>{
    try{

        const {
            title,
            description,
            category,
            venue,
            date,
            ticketPrice,
            totalSeats,
            image
        } = req.body;

        const event = await Event.create({
            title,
            description,
            category,
            venue,
            date,
            ticketPrice,
            totalSeats,
            availableSeats: totalSeats,
            image,
            organizer: req.user._id
        });

        res.status(201).json(event);

    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

const getAllEvents = async (req,res)=>{
    try{

        const events = await Event.find()
        .populate("organizer","name email");

        res.json(events);

    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const getEventById = async (req, res) => {
  try {

    const event = await Event.findById(req.params.id)
      .populate("organizer", "name email");

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json(event);

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
      req.body.description || event.description;

    event.category =
      req.body.category || event.category;

    event.venue =
      req.body.venue || event.venue;

    event.date =
      req.body.date || event.date;

    event.ticketPrice =
      req.body.ticketPrice || event.ticketPrice;

    event.totalSeats =
      req.body.totalSeats || event.totalSeats;

    event.image =
      req.body.image || event.image;

    event.status =
      req.body.status || event.status;

    const updatedEvent =
      await event.save();

    res.json(updatedEvent);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const deleteEvent = async (req, res) => {
  try {

    const event = await Event.findById(req.params.id);

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

    await event.deleteOne();

    res.json({
      message: "Event deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const getMyEvents = async (req, res) => {
  try {

    const events = await Event.find({
      organizer: req.user._id
    });

    res.json(events);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    getMyEvents,
    updateEvent,
    deleteEvent
    
};