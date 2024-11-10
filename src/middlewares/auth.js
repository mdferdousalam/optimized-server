const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, "SECRET_KEY", (err, decoded) => {
    if (err)
      return res.status(401).json({ error: "Failed to authenticate token" });
    req.userId = decoded.userId;
    next();
  });
};
