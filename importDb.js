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
    // test relationship
    let record = jsonData.maintenance[3];
    console.log(insertedEquipment[+record.equipmentId - 1]._id);
    console.log(insertedEquipment[+record.equipmentId - 1]);
    // Convert equipmentId in maintenance records
    const maintenanceData = jsonData.maintenance.map((record) => ({
      ...record,
      equipmentId: insertedEquipment[+record.equipmentId - 1]._id,
    }));
    await Maintenance.insertMany(maintenanceData);
    console.log("Maintenance Data imported successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    mongoose.connection.close();
  }
});
