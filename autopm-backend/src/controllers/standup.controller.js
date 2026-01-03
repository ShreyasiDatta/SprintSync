const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");



exports.getDailyStandupText = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ project: projectId });

    const yesterday = [];
    const today = [];
    const blockers = [];

    const since = new Date();
    since.setDate(since.getDate() - 1);

    tasks.forEach((task) => {
      // Yesterday summary
      if (task.updatedAt >= since) {
        if (task.status === "Done") {
          yesterday.push(`${task.taskId} was completed`);
        }
        if (task.status === "In Progress") {
          yesterday.push(`${task.taskId} moved to In Progress`);
        }
      }

      // Today summary
      if (task.status === "In Progress") {
        today.push(`Continue working on ${task.taskId}`);
      }

      // Blockers
      if (task.status === "At Risk") {
        blockers.push(
          `${task.taskId} is at risk due to inactivity or missed deadline`
        );
      }
    });

    // Convert to readable text
    const standupText = `
Yesterday:
${yesterday.length ? yesterday.map(i => `- ${i}`).join("\n") : "- No updates yesterday"}

Today:
${today.length ? today.map(i => `- ${i}`).join("\n") : "- No active tasks today"}

Blockers:
${blockers.length ? blockers.map(i => `- ${i}`).join("\n") : "- No blockers 🎉"}
    `.trim();

    res.json({
      standupText,
    });
  } catch (error) {
    console.error("Standup Text Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
