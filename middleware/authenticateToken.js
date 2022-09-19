const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  // Option 1
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader); // Bearer token
  const token = authHeader.split(' ')[1];

  // Option 2
//   const token = req.header("x-auth-token");
console.log(token);
  // If token not found, send error message
  if (!token) {
     return res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }

  // Authenticate token
  try {
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user.email;
    next();
  } catch (error) {
  return   res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
};

module.exports = authToken;