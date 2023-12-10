const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRoutes = require("./routes/userRoutes");
const TaskRoutes = require("./routes/taskRoutes");
const authenticateUser = require("./middlewares/authMiddleware");
const multerMiddleware = require("./middlewares/multerMiddleware");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    // Exit the process with an error code
  }
};

connectToDatabase();

// Routes
app.use("/users", multerMiddleware, UserRoutes);
app.use("/api", authenticateUser, TaskRoutes); // Protected routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
