const Task = require("../models/Task");
const Project = require("../models/Project");

exports.createTask = async (req, res) => {
  try {
    const { taskId, title } = req.body;
    const { projectId } = req.params;

    // 1. Check project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 2. Create task
    const task = await Task.create({
      taskId,
      title,
      project: projectId,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Task created",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
