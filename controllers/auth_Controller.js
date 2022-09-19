const User = require("../models/user_Model");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const cloudinary = require("../utils/cloudinary");
const JWT = require('jsonwebtoken');
let refreshTokens = [];

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

// Sign up
const signup = asyncHandler(async (req, res) => {
      const { email, password, status } = req.body;
  
      if (!email || !password ) {
        return res.status(400).json({ message: "Please add all fields" });
      }
  
      // Check if Pharmacist exists
  const UserExists = await User.findOne({ email });

  if (UserExists) {
    return res.status(409).json({ message: "User already exists" }); // 409 conflict
  }

      try {

         // Hash password before saving to database
      const salt = await bcrypt.genSalt(10);
      console.log("salt:", salt);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log("hashed password:", hashedPassword);
  

        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "user_image",
          width: 150,
          height: 300,
          crop: "fill",
        });
        console.log(result);
    
    
        const user = new User({
            email,
            p_pwd: hashedPassword,
          image: {
            public_id: result.public_id,
            url: result.secure_url,
          },
          status,
        },
        );
    
        await user.save();
    
// Do not include sensitive information in JWT
const accessToken = await JWT.sign(
    { email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1m",
    }
  );

  return res.status(201).json({ success: `New User created!` + user + `access token`+ accessToken });
} catch (err) {
  console.log(err);
  return res.status(500).send(err);
}
    }
  );


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //check field are not empty
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required." });
  
    // Check for user email
    const user = await User.findOne({ email });
  
    if (!user) return res.sendStatus(401).json({ message: "user not found." }); //Unauthorized
  
    //evaluate password
    const ismatch = await bcrypt.compare(password, user.p_pwd);
  
    if (!ismatch) {
        return res.sendStatus(400).json({ message: "Email or password is invalid" }); //Unauthorized
  
    }

    const accessToken = JWT.sign(
        {
            "UserInfo": {
                "username": user.email,
                // "roles": pharmacist.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    // Refresh token
  const refreshToken = await JWT.sign(
    { email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "60m",
    }
  );

  // Set refersh token in refreshTokens array
  refreshTokens.push(refreshToken);

  res.json({
    accessToken,
    refreshToken,
  });

  // Creates Secure Cookie with refresh token
  res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

});



// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    const foundUser = await User.findOne({ refreshToken }).exec();

    // Detected refresh token reuse!
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.status(403).json({message: `forbidden`}); //Forbidden
                // Delete refresh tokens of hacked user
                const hackedUser = await User.findOne({ username: decoded.username }).exec();
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
            }
        )
        return res.sendStatus(403); //Forbidden
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

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
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

            // Refresh token was still valid
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );

            const newRefreshToken = jwt.sign(
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '15s' }
            );
            // Saving refreshToken with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            res.json({ accessToken })
        }
    );
    });

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const refreshToken = req.header("x-auth-token");

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
return  res.sendStatus(204);
}

module.exports = {
    signup,
    login,
    refresh,
    logout
}