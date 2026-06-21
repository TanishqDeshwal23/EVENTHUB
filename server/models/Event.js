const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },
    status: {
    type: String,
    enum: [
        "Upcoming",
        "Completed",
        "Cancelled"
    ],
    default: "Upcoming"
    },

    description:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    venue:{
        type:String,
        required:true
    },

    date:{
        type:Date,
        required:true
    },

    ticketPrice:{
        type:Number,
        required:true
    },

    totalSeats:{
        type:Number,
        required:true
    },

    availableSeats:{
        type:Number,
        required:true
    },

    image:{
        type:String,
        default:""
    },

    organizer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Event", eventSchema);