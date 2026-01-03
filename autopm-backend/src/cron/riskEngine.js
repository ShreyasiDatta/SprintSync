console.log("✅ Risk Engine loaded");

const cron = require("node-cron");
const Task = require("../models/Task");

const DAYS_INACTIVE = 0;

cron.schedule("0 9 * * *", async () => {
  console.log("Running Risk Engine...");

  try {
    const now = new Date();
    let count = 0;

    const tasks = await Task.find({
      status: { $ne: "Done" },
    });

    for (const task of tasks) {
      let markAtRisk = false;

      // Rule 1: Inactivity
      const inactiveDays =
        (now - new Date(task.updatedAt)) / (1000 * 60 * 60 * 24);

      if (inactiveDays >= DAYS_INACTIVE) {
        markAtRisk = true;
      }

      // Rule 2: Deadline missed
      if (task.dueDate && new Date(task.dueDate) < now) {
        markAtRisk = true;
      }

      if (markAtRisk && task.status !== "At Risk") {
        task.status = "At Risk";
        await task.save();
        count++;
      }
    }

    console.log(`${count} tasks marked At Risk`);
  } catch (error) {
    console.error("Risk Engine Error:", error);
  }
});