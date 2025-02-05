const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const USER = require("../models/user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Check if Authorization header exists
  if (!authorization) {
    return res.status(401).json({ message: "User must be logged in." });
  }

  // Extract token
  const token = authorization.replace("Bearer ", "").trim();
  

  // Verify token
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    const { _id } = payload;

    
    USER.findById(_id)
      .then((userdata) => {
        if (!userdata) {
          return res.status(404).json({ message: "User not found." });
        }

        req.user = userdata;
        next(); 
      })
      .catch((err) => {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal server error." });
      });
  });
};
