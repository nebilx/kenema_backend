const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

  console.log(authHeader); // Bearer token
  const token = authHeader.split(' ')[1];

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
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return   res.status(403).json({
              errors: [
                {
                  msg: "Invalid token",
                },
              ],
            });
            req.user = decoded.UserInfo.username;
            req.role = decoded.UserInfo.role;

            console.log(decoded.UserInfo.role);
            next();
        }
    );
};

module.exports = authToken;