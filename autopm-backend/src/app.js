const express = require("express");
const cors = require("cors");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

module.exports = app;

app.use("/auth", require("./routes/auth.routes"));

app.use("/projects", require("./routes/project.routes"));

app.use("/webhooks", require("./routes/webhook.routes"));

app.use("/tasks", require("./routes/task.routes"));

app.use("/projects", projectRoutes);

app.use("/projects", taskRoutes);

