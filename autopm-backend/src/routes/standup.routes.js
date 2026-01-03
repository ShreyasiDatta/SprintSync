const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getDailyStandupText,
} = require("../controllers/standup.controller");

router.get(
  "/projects/:projectId/standup-text",
  auth,
  getDailyStandupText
);

module.exports = router;

