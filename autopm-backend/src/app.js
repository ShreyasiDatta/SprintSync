const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");
const webhookRoutes = require("./routes/webhook.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

// ROUTES
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/projects", taskRoutes);  
app.use("/webhooks", webhookRoutes);
app.use("/", require("./routes/sprint.routes"));
app.use("/", require("./routes/standup.routes"));
app.use("/tasks", taskRoutes);
app.use("/projects", taskRoutes);


module.exports = app;
