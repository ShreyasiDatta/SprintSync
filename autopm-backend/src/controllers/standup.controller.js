const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");

exports.getDailyStandup = async (req, res) => {
  try {
    const { projectId } = req.params;

    const since = new Date();
    since.setDate(since.getDate() - 1);

    // Yesterday's activity
    const recentActivity = await ActivityLog.find({
      project: projectId,
      timestamp: { $gte: since },
    }).populate("task");

    // Today's tasks
    const todayTasks = await Task.find({
      project: projectId,
      status: { $in: ["Todo", "In Progress"] },
    });

    // Blockers
    const blockers = await Task.find({
      project: projectId,
      status: "At Risk",
    });

    res.json({
      yesterday: recentActivity.map((a) => ({
        taskId: a.task?.taskId,
        message: a.message,
      })),
      today: todayTasks.map((t) => ({
        taskId: t.taskId,
        title: t.title,
        status: t.status,
      })),
      blockers: blockers.map((t) => ({
        taskId: t.taskId,
        title: t.title,
      })),
    });
  } catch (err) {
    console.error("Standup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
