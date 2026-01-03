const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getGithubRepos,
  createProject,
  getProjects
} = require("../controllers/project.controller");

router.get("/", authMiddleware, getProjects);  
router.get("/github-repos/:userId", getGithubRepos);

router.post("/", authMiddleware, createProject);

module.exports = router;
