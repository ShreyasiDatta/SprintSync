const Task = require("../models/Task");

/**
 * GET SPRINT SUMMARY
 * GET /projects/:projectId/sprint-summary
 */
exports.getSprintSummary = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ project: projectId });

    const summary = {
      totalTasks: tasks.length,
      todo: 0,
      inProgress: 0,
      done: 0,
      atRisk: 0,
      completionPercentage: 0,
    };

    tasks.forEach((task) => {
      if (task.status === "Todo") summary.todo++;
      if (task.status === "In Progress") summary.inProgress++;
      if (task.status === "Done") summary.done++;
      if (task.status === "At Risk") summary.atRisk++;
    });

    summary.completionPercentage =
      summary.totalTasks === 0
        ? 0
        : Math.round((summary.done / summary.totalTasks) * 100);

    res.json(summary);
  } catch (error) {
    console.error("Sprint Summary Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
