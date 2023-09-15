const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const secretKey = "secret-key";

module.exports = async function (req, res, next) {
  const token =
    req.headers["authorization"] || req.query.token || req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed: User not found." });
    }
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Authentication failed: Invalid token." });
  }
};

