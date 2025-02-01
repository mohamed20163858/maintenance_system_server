const express = require("express");
const router = express.Router();
const Maintenance = require("../models/Maintenance");

// Get all maintenance records
router.get("/", async (req, res) => {
  try {
    const maintenance = await Maintenance.find().populate("equipmentId");
    res.json(maintenance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single maintenance record
router.get("/:id", getMaintenance, (req, res) => {
  res.json(res.maintenance);
});

// Create maintenance record
router.post("/", async (req, res) => {
  const maintenance = new Maintenance(req.body);
  try {
    const newMaintenance = await maintenance.save();
    res.status(201).json(await newMaintenance.populate("equipmentId"));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update maintenance record
router.put("/:id", getMaintenance, async (req, res) => {
  try {
    Object.assign(res.maintenance, req.body);
    const updatedMaintenance = await res.maintenance.save();
    res.json(await updatedMaintenance.populate("equipmentId"));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete maintenance record
router.delete("/:id", getMaintenance, async (req, res) => {
  try {
    await res.maintenance.deleteOne();
    res.json({ message: "Maintenance record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get maintenance by ID
async function getMaintenance(req, res, next) {
  try {
    const maintenance = await Maintenance.findById(req.params.id).populate(
      "equipmentId"
    );
    if (!maintenance) {
      return res.status(404).json({ message: "Maintenance record not found" });
    }
    res.maintenance = maintenance;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
