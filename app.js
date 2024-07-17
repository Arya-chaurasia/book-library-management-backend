require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./database");
const routes = require("./controllers/book.route");
const bodyParser = require("body-parser");

const port = process.env.PORT || 4000;

app.listen(port)
database;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use('/api', routes);

app.get("/", (req, res) => {
    res.send(`<h1>Server is running on Port ${port}</h1>`);
  });
  
module.exports = app;