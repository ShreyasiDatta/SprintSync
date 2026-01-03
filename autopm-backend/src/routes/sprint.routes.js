const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getSprintSummary } = require("../controllers/sprint.controller");

router.get(
  "/projects/:projectId/sprint-summary",
  auth,
  getSprintSummary
);

module.exports = router;

