require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const equipmentRoutes = require("./routes/equipmentRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/equipment", equipmentRoutes);
app.use("/api/maintenance", maintenanceRoutes);

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Welcome to the Equipment Maintenance API!");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Vercel deployment requirement
module.exports = app;
