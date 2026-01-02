const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getDailyStandup } = require("../controllers/standup.controller");

router.get(
  "/projects/:projectId/standup",
  auth,
  getDailyStandup
);

module.exports = router;
