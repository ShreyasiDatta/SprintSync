const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getGithubRepos,
  createProject,
} = require("../controllers/project.controller");

router.get("/github-repos/:userId", getGithubRepos);
router.post("/", authMiddleware, createProject);

module.exports = router;
