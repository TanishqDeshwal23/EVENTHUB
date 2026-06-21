require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const bookingRoutes =require("./routes/bookingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/bookings",bookingRoutes);

app.use("/api/dashboard",dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("EventHub API Running...");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB Connected");
    console.log("Database Name:", mongoose.connection.db.databaseName);

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });

  })
  .catch((err) => {
    console.log(err);
  });

