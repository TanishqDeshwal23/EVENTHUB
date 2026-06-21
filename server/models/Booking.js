const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true
    },

    quantity:{
        type:Number,
        required:true
    },

    totalAmount:{
        type:Number,
        required:true
    },

    paymentStatus:{
        type:String,
        default:"Pending"
    },

    qrCode:{
        type:String,
        default:""
    },

    checkedIn:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
});

module.exports = mongoose.model(
    "Booking",
    bookingSchema
);