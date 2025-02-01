const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    department: { type: String, required: true },
    model: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    installDate: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Operational", "Down", "Maintenance", "Retired"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Equipment", equipmentSchema);
