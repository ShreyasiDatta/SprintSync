console.log("✅ Risk Engine loaded");

const cron = require("node-cron");
const Task = require("../models/Task");

const DAYS_INACTIVE = 0;

cron.schedule("0 9 * * *", async () => {
  console.log("Running Risk Engine...");

  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - DAYS_INACTIVE);

    const result = await Task.updateMany(
      {
        status: { $ne: "Done" },
        updatedAt: { $lt: cutoffDate },
      },
      {
        status: "At Risk",
      }
    );

    console.log(` ${result.modifiedCount} tasks marked At Risk`);
  } catch (error) {
    console.error("Risk Engine Error:", error);
  }
});
