// *** Dependencies
// =============================================================
var express = require("express");
var router = express.Router();
var Scraped = require("../model/scraped.js");
var Saved = require("../model/saved.js");
var scraper = require("../controller/scraperController.js");
var path = require("path");


// Routes
// =============================================================

// 1. At the "/" path display every entry in the scraped collection 
router.get("/", function (req, res) {
    // res.sendFile(path.join(__dirname, "../public/test.html"));

    // Query: In the news database, go to the scraped collection, then "find" everything (all scraped articles)
    Scraped.find({}, function (error, found) {
        // Log any errors if the server encounters one
        if (error) {
            console.log(error);
        }
        else {
            // Otherwise, render the result of the query as handlebars
            res.render("home", { article: found });            
        }
    });
});

// 2. At the "/api/scrape" path call the scraper function.
router.get("/api/scrape", function (req, res) {
    // Run the scrapeThis function from controller
    scraper.scrapeThis(function () {
        // After scraping redirect to home route to render all scraped articles
        res.redirect("/");
    });
});

// 3. At the "/api/save:id" path update the article's saved key to true in the Scraped document
router.put("/api/saved/:id", function (req, res) {
    
    // Use the article id to find and update it's saved property

    // Testing to see what id is
    // var id = "id is: " + req.params.id;
    var id = req.params.id;
    console.log("id is: " + id);

    var updatedObj = {"saved": true};
        
    Scraped.findByIdAndUpdate(id, updatedObj, {new: true}, function(err, found) {
        if (err) {
            console.log(err);
        }
        // res.render("saved", {saved: found})
    })
});

// 4. At the "/saved" path display all the saved articles
router.get("/saved", function (req, res) {
    Scraped.find({"saved": true}, function (error, found) {
        // Log any errors
        if (error) {
            console.log(error);
        } else {
             // Otherwise, render the result of the query as handlebars
            res.render("saved", {saved: found});
        }
    });
});

//5. Delete a saved article
router.post("/api/delete/:id", function (req, res) {

    // Use the article id to find and update it's saved property
    // var articleId = req.params.id;    
    Article.findOneAndUpdate({
        "_id": req.params.id
    }, { "saved": false })
        // Execute the above query
        .exec(function (err, doc) {
            // Log any errors
            if (err) {
                console.log(err);
            } else {
                // Or send the document to the browser
                console.log("deleted the article");
                res.send(doc);
            }
        });
}
);
module.exports = router;