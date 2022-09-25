const Pharmacy = require("../models/Pharmacy_User_Model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
let refreshTokens = [];

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { uname, pwd } = req.body;

  //check field are not empty
  if (!uname || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // Check for user email
  const pharmacy = await Pharmacy.findOne({ uname });

  if (!pharmacy) return res.sendStatus(401).json({ message: "user not found." }); //Unauthorized

  //evaluate password
  const ismatch = await bcrypt.compare(pwd, pharmacy.pwd);

  if (!ismatch) {
    return res
      .sendStatus(400)
      .json({ message: "Email or password is invalid" }); //Unauthorized
  }

  const accessToken = JWT.sign(
    {
      UserInfo: {
        username: pharmacy.name,
       "role": pharmacy.role
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  // Refresh token
  const refreshToken = await JWT.sign(
    { name: pharmacy.name },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "60m",
    }
  );

  // Set refersh token in refreshTokens array
  refreshTokens.push(refreshToken);

  // Creates Secure Cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.json({
   "role" :pharmacy.role,
    accessToken,
    refreshToken,
  });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  const foundUser = await Pharmacy.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: `forbidden` }); //Forbidden
        // Delete refresh tokens of hacked user
        const hackedUser = await Pharmacy.findOne({
          uname: decoded.uname,
        }).exec();
        hackedUser.refreshToken = [];
        const result = await hackedUser.save();
      }
    );
    return res.sendStatus(403); //Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        // expired refresh token
        foundUser.refreshToken = [...newRefreshTokenArray];
        const result = await foundUser.save();
      }
      if (err || foundUser.uname !== decoded.uname)
        return res.sendStatus(403);

      // Refresh token was still valid
      const roles = Object.values(foundUser.role);
      const accessToken = JWT.sign(
        {
          UserInfo: {
            username: decoded.uname,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );

      const newRefreshToken = jwt.sign(
        { username: foundUser.uname },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "15s" }
      );
      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save();

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    }
  );
});

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const refreshToken = req.header("x-auth-token");

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  return res.sendStatus(204).json({ message: "log out success" });
};

module.exports = {
  login,
  refresh,
  logout,
};
