const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const User = require("../models/User");

    const user = await User.findOne(); // TEMP dev user

    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Auth middleware failed" });
  }
};

