const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["commit", "pull_request", "merge"],
      required: true,
    },
    message: String,
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    timestamp: { type: Date, default: Date.now },
  }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);
