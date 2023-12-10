const Task = require("../models/taskModel");

// Get all tasks for the authenticated user
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new task for the authenticated user
exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      status,
      userId: req.user.userId, // Associate the task with the authenticated user
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a specific task for the authenticated user
exports.getTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOne({ _id: taskId, userId: req.user.userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a specific task for the authenticated user
exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user.userId },
      { title, description, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a specific task for the authenticated user
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      userId: req.user.userId,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(deletedTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
