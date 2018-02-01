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

// Routes
// =============================================================
var routes = require("controller/scraperController.js");

app.use("/", routes);

// Starting our Express app
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
