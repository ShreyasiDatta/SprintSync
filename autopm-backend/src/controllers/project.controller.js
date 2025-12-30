const axios = require("axios");
const User = require("../models/User");
const Project = require("../models/Project");

// Fetch GitHub repos
exports.getGithubRepos = async (req, res) => {
  const user = await User.findById(req.params.userId);

  const response = await axios.get(
    "https://api.github.com/user/repos",
    {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }
  );

  res.json(response.data);
};



// Create project from selected repo
exports.createProject = async (req, res) => {
  console.log("REQ.USER ", req.user);
  const { name, repoUrl, ownerId } = req.body;

  const project = await Project.create({
    name: req.body.name,
    repoUrl: req.body.repoUrl,
    owner: req.user._id
  });

  res.json({
    message: "Project created",
    project,
  });
};
