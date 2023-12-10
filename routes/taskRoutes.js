const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
//task routes

router.get("/showAlltasks", authMiddleware, TaskController.getAllTasks);
router.post("/createTask", authMiddleware, TaskController.createTask);
router.get("/getTask/:id", authMiddleware, TaskController.getTask);
router.put("/updateTask/:id", authMiddleware, TaskController.updateTask);
router.delete("/deleteTask/:id", authMiddleware, TaskController.deleteTask);

module.exports = router;
