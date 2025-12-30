const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createTask } = require("../controllers/task.controller");

router.post("/:projectId/tasks", auth, createTask);

module.exports = router;
