const express = require("express");
const router = express.Router();
const ActivityLog = require("../models/ActivityLog");
const Task = require("../models/Task");

router.post("/github", async (req, res) => {
  const eventType = req.headers["x-github-event"];

  if (eventType === "push") {
  const commits = req.body.commits || [];

  for (const commit of commits) {
    const message = commit.message;

    // 1️⃣ Store activity (you already had this)
    await ActivityLog.create({
      type: "commit",
      message,
      timestamp: new Date(commit.timestamp),
    });

    // 2️⃣ Extract TASK ID from commit message
    const match = message.match(/\[TASK-(\d+)\]/);

    if (!match) continue;

    const taskId = `TASK-${match[1]}`;

    // 3️⃣ Update task status automatically
    const task = await Task.findOneAndUpdate(
      { taskId },
      {
        status: "In Progress",
        lastActivityAt: new Date(),
      },
      { new: true }
    );

    if (task) {
      console.log(`Task ${taskId} moved to In Progress`);
    }
  }

  console.log(`Processed ${commits.length} commits`);
}


  if (eventType === "pull_request") {
    await ActivityLog.create({
      type: "pull_request",
      message: req.body.pull_request.title,
      timestamp: new Date(req.body.pull_request.created_at),
    });

    console.log("Stored pull request activity");
  }

  res.status(200).send("OK");
});


module.exports = router;