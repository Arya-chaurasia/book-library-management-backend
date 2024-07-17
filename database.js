const mongoose = require("mongoose");
const winston = require("winston");

const database = mongoose
  .connect("mongodb://localhost:27017/book-library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {   
    winston.info(`Process ${process.pid} is connected to DB`);
  })
  .catch((err) => {
    winston.error("App starting error: " + err.message);
    process.exit(1);
  });

module.exports = database;
