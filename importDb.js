require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");

// Replace with your MongoDB connection string

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  // Read db.json file
  const rawData = fs.readFileSync("db.json", "utf8");
  const jsonData = JSON.parse(rawData);

  const Equipment = require("./models/Equipment");
  const Maintenance = require("./models/Maintenance");

  try {
    // Insert data into MongoDB
    const insertedEquipment = await Equipment.insertMany(jsonData.equipment);
    console.log("Equipment Data imported successfully");
    // Create a mapping of old string IDs to new ObjectIds
    const equipmentMap = new Map();
    insertedEquipment.forEach((eq) => {
      equipmentMap.set(eq.id, eq._id); // Map old string ID to new MongoDB ObjectId
    });

    // Convert equipmentId in maintenance records
    const maintenanceData = jsonData.maintenance.map((record) => ({
      ...record,
      equipmentId:
        equipmentMap.get(record.equipmentId) || new mongoose.Types.ObjectId(), // Convert to ObjectId
    }));
    await Maintenance.insertMany(maintenanceData);
    console.log("Maintenance Data imported successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    mongoose.connection.close();
  }
});
