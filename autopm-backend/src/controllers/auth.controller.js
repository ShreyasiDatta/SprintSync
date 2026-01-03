const axios = require("axios");
const User = require("../models/User");

exports.githubLogin = (req, res) => {
  const redirectUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&scope=repo user`;

  res.redirect(redirectUrl);
};

exports.githubCallback = async (req, res) => {
  const { code } = req.query;

  // 1. Exchange code for access token
  const tokenRes = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    { headers: { Accept: "application/json" } }
  );

  const accessToken = tokenRes.data.access_token;

  // 2. Fetch GitHub user
  const userRes = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const githubUser = userRes.data;

  // 3. Save / update user in DB
  const user = await User.findOneAndUpdate(
    { githubId: githubUser.id },
    {
      githubId: githubUser.id,
      username: githubUser.login,
      avatar: githubUser.avatar_url,
      accessToken,
    },
    { upsert: true, new: true }
  );

  res.json({
    message: "GitHub login successful",
    user,
  });
};
