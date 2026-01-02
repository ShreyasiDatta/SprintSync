const Task = require("../models/Task");
const Project = require("../models/Project");

/**
 * CREATE TASK
 * POST /projects/:projectId/tasks
 */
exports.createTask = async (req, res) => {
  try {
    const { taskId, title } = req.body;
    const { projectId } = req.params;

    if (!taskId || !title) {
      return res.status(400).json({ message: "taskId and title are required" });
    }

    // Check project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Prevent duplicate task IDs in same project
    const existingTask = await Task.findOne({ taskId, project: projectId });
    if (existingTask) {
      return res.status(409).json({ message: "Task already exists" });
    }

    const task = await Task.create({
      taskId,
      title,
      project: projectId,
      status: "Todo",
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Task created",
      task,
    });
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET TASKS BY PROJECT
 * GET /projects/:projectId/tasks
 */
exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ project: projectId }).sort({
      createdAt: 1,
    });

    res.json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE TASK STATUS (Manual or Automation)
 * PATCH /tasks/:taskId/status
 */
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { taskId } = req.params;

    const allowedStatuses = ["Todo", "In Progress", "Done", "At Risk"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const task = await Task.findOneAndUpdate(
      { taskId },
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task status updated",
      task,
    });
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

