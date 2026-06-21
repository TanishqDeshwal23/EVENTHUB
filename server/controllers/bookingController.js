const Booking = require("../models/Booking");
const Event = require("../models/Event");

const createBooking = async (req,res)=>{

   

    try{

        const {
            eventId,
            quantity
        } = req.body;

         console.log("Event ID received:", eventId);

        const event = await Event.findOne({ _id: eventId });

        if (!event) {
        return res.status(404).json({
            message: "Event not found"
        });
        }

        if (quantity > event.availableSeats) {
        return res.status(400).json({
            message:
            "Not enough seats available"
        });
        }
        if (quantity <= 0) {
        return res.status(400).json({
            message:
            "Invalid quantity"
        });
        }

        console.log("Event Found:", event);
        console.log("DB:", Event.db.name);
        console.log("Collection:", Event.collection.name);
        
        if(!event){
            return res.status(404).json({
                message:"Event not found"
            });
        }

        if(event.availableSeats < quantity){
            return res.status(400).json({
                message:"Not enough seats available"
            });
        }

        const totalAmount =
            quantity * event.ticketPrice;

        const booking = await Booking.create({

            user:req.user._id,

            event:event._id,

            quantity,

            totalAmount,

            paymentStatus:"Pending"

        });

        event.availableSeats = event.availableSeats - quantity;



        await event.save();

        res.status(201).json(booking);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};

const getMyBookings = async (req,res)=>{

    try{

        const bookings =
            await Booking.find({
                user:req.user._id
            })
            .populate("event");

        res.json(bookings);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const getEventBookings = async (req, res) => {
  try {

    console.log(
      "EVENT ID RECEIVED:",
      req.params.eventId
    );

    const bookings = await Booking.find({
      event: req.params.eventId
    })
      .populate(
        "user",
        "name email"
      )
      .populate(
        "event",
        "title image venue date time"
      );

    console.log(
      "BOOKINGS FOUND:",
      bookings
    );

    res.json(bookings);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};

const deleteBooking = async (
  req,
  res
) => {

  try {

    const booking =
      await Booking.findById(
        req.params.id
      );

    if (!booking) {

      return res.status(404)
        .json({
          message:
            "Booking not found"
        });

    }

    if (
      booking.user.toString() !==
      req.user._id.toString()
    ) {

      return res.status(401)
        .json({
          message:
            "Not Authorized"
        });

    }

    // Restore Seats

    const event =
      await Event.findById(
        booking.event
      );

    if (event) {

      event.availableSeats +=
        booking.quantity;

      await event.save();

    }

    await booking.deleteOne();

    res.json({
      message:
        "Booking Cancelled Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};

module.exports = {
    createBooking,
    getMyBookings,
    getEventBookings,
    deleteBooking
};