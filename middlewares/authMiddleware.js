const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  // Extract the token from the request header
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach the user data to the request for further use
    req.user = { userId: decoded.userId, email: decoded.email };

    // Send the token to the client-side (in this case, storing it in local storage)
    res.locals.token = token;
    next();
  });
};

module.exports = authenticateUser;
