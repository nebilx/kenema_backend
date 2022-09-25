//npm i dotenv
require("dotenv").config();

// create express server allows us to set up middleware to respond to HTTP Requests.
const express = require("express");
const app = express();
//Cross-Origin Resource Sharing that help us d/f port requests to communicate
const cors = require("cors");

const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const verify_token = require("./middleware/Verify_JWT");
const verify_roles = require("./middleware/Verify_Roles");
const role_list = require("./config/roles_list");

const auth = require("./routes/Auth");
const batch = require("./routes/Batch");
const branch = require("./routes/Branch");
const insurance_user = require("./routes/Insurance_User");
const medicine = require("./routes/Medicine");
const pharmacy_user = require("./routes/Pharmacy_User");
const prescription = require("./routes/Prescription");

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// custom middleware logger
// to log every request coming from client
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//middleware for cookies
app.use(cookieParser());

//routes
app.use("/auth", auth);
app.use("/batch", batch);
app.use("/branch", branch);
app.use("/insurance_user", insurance_user);
app.use("/medicine", medicine);
app.use("/pharmacy_user", pharmacy_user);
app.use("/prescription", prescription);

app.get("/test", verify_token, verify_roles(role_list.Pharmacist), (req, res) => {
  res.json("test pharmacist");
});

app.get("/test1", verify_token, verify_roles(role_list.Admin), (req, res) => {
  res.json("test1 hellow admin");
});

app.get("/test2", verify_token, verify_roles(role_list.Admin), (req, res) => {
  res.json("test2 hello insurance user");
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    //  res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

//log every error that happening on app
app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
