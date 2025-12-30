const express = require("express");
const router = express.Router();
const { githubLogin, githubCallback } = require("../controllers/auth.controller");

router.get("/github", githubLogin);
router.get("/github/callback", githubCallback);

module.exports = router;
