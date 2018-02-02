// *** Dependencies
// =============================================================
var express = require("express");
var router = express.Router();
var Scraped = require("../model/scraped.js");
var Saved = require("../model/saved.js");
var scraper = require("../controller/scraperController.js");


// Routes
// =============================================================

// 1. At the "/" path display every entry in the scraped collection 
router.get("/", function (req, res) {
    // Query: In the news database, go to the scraped collection, then "find" everything (all scraped articles)
    Scraped.find({}, function (error, found) {
        // Log any errors if the server encounters one
        if (error) {
            console.log(error);
        }
        // Otherwise, send the result of this query to the browser as JSON
        // PUT HANDLEBARS HERE
        else {
            res.json(found);
        }
    });
});

// 2. At the "/scrape" path call the scraper function.
router.get("/api/scrape", function (req, res) {
    // Run the scrapeThis function from controller
    scraper.scrapeThis(function() 
	{
        // After scraping redirect to home route to render all scraped articles
		res.redirect("/");
	});
}); 

// 3. At the "/saved" path display every entry in the saved collection
router.get("/saved", function (req, res) {
    // Query: In the news-scraper database, go to the saved collection, then "find" everything (all articles saved by user) and sort by date saved
    Saved.find().sort({ created: 1 }, function (error, found) {
        // Log any errors if the server encounters one
        if (error) {
            console.log(error);
        }
        // Otherwise, send the result of this query to the browser as JSON
        else {
            res.json(found);
        }
    });
});


module.exports = router;