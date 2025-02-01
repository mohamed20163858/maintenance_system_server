const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    equipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },
    date: { type: Date, required: true },
    type: {
      type: String,
      required: true,
      enum: ["Preventive", "Repair", "Emergency"],
    },
    technician: { type: String, required: true },
    hoursSpent: { type: Number, required: true },
    description: { type: String, required: true },
    partsReplaced: [String],
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    completionStatus: {
      type: String,
      enum: ["Complete", "Incomplete", "Pending Parts"],
      default: "Incomplete",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);
