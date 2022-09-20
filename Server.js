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
const verify_tokken = require("./middleware/authenticateToken");
const medcontent = require("./routes/medcontent");
const branch = require("./routes/Branch");
const patient = require("./routes/Patient");
const pharmacist = require("./routes/Pharmacist");
const medicine = require("./routes/Medicine");
const Batch = require("./routes/Batch");
const package = require("./routes/Package");
const unit = require("./routes/Unit");
const type = require("./routes/Type");
const dosage = require("./routes/Dosage");
const prescription = require("./routes/Prescription");
const pharmacy_user = require("./routes/Pharmacy_User");

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
app.use("/unit", unit);
app.use("/package", package);
app.use("/medcontent", medcontent);
app.use("/type", type);
app.use("/dosage", dosage);
app.use("/branch", branch);
app.use("/pharmacy_user", pharmacy_user);
app.use("/pharmacist", pharmacist);
app.use("/patient", patient);
app.use("/medicine", medicine);
app.use("/batch", Batch);
app.use("/prescription", prescription);

app.get("/test", verify_tokken, (req, res) => {
  res.json("test data reached");
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
