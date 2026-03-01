require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const urlRoutes = require("./routes/urlRoutes");

const app = express();   // ✅ create app FIRST

app.use(express.json()); // ✅ middleware
app.use(express.static("public"));

console.log("Server file loaded...");

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

// Routes
app.use("/", urlRoutes);  // ✅ after app is created

app.listen(5000, () => {
  console.log("Server running on port 5000");
});