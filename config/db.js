//MongoDB client library providing object-modelling for use in an asynchronous environment
const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const con = await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("\x1b[35m%s\x1b[0m", "DB Connected");
      });

    mongoose.connection.on("error", (err) => {
      console.log(`DB Connection error: ${err.message}`);
    });

    // console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (err) {
    console.error("\x1b[31m%s\x1b[0m", `Error: ${err.message}`);
    process.exit(1);
  }
};
