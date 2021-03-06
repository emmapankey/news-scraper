// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.

// *** Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const exphb = require("express-handlebars");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");


// Sets up the Express App
// =============================================================
const app = express();
var PORT = process.env.PORT || 3000;

// Allow the assets folder to be used for static content
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));

// Establish the view engine as Handlebars and use the Default view as the main.handlebars file
app.engine("handlebars", exphb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://heroku_m6wb62bz:c0hubc98jmk1c4momrs5lsg38k@ds153699.mlab.com:53699/heroku_m6wb62bz", {
  // useMongoClient: true
});

// Routes
// =============================================================
var routes = require("./routes/routes");

app.use("/", routes);

// Starting our Express app
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
