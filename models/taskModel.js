const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

taskSchema.pre("save", function (next) {
  // Set the updatedAt field to the current date when the task is modified
  this.updatedAt = new Date();
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
