const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createTask,
  getTasksByProject,
  updateTaskStatus,
} = require("../controllers/task.controller");

router.post("/:projectId/tasks", auth, createTask);
router.get("/:projectId/tasks", auth, getTasksByProject);
router.patch("/:taskId/status", auth, updateTaskStatus);

module.exports = router;
