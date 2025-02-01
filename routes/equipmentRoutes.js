const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment");

// Get all equipment
router.get("/", async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single equipment
router.get("/:id", getEquipment, (req, res) => {
  res.json(res.equipment);
});

// Create equipment
router.post("/", async (req, res) => {
  const equipment = new Equipment(req.body);
  try {
    const newEquipment = await equipment.save();
    res.status(201).json(newEquipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update equipment
router.put("/:id", getEquipment, async (req, res) => {
  try {
    Object.assign(res.equipment, req.body);
    const updatedEquipment = await res.equipment.save();
    res.json(updatedEquipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete equipment
router.delete("/:id", getEquipment, async (req, res) => {
  try {
    await res.equipment.deleteOne();
    res.json({ message: "Equipment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get equipment by ID
async function getEquipment(req, res, next) {
  let equipment;
  try {
    equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.equipment = equipment;
  next();
}

module.exports = router;
