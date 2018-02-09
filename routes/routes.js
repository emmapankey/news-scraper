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
// router.get("/api/saved/:id", function (req, res) {
//     console.log(req.params.id)
//     db.Scraped.findOneAndUpdate({_id: req.params.id}, { $set: { saved: true} }, function(error, updated){
//         if (error){
//             console.log("Something wrong when updating data!");
//         }
//         else {
//             console.log(updated);
//         }
//     });
// });

router.put("/api/saved/:id", function (req, res) {
    var articleId = req.params.id;
    console.log(articleId);
    // console.log(newSavedState);
    // var updatedObj = {saved: true};
    Scraped.findByIdAndUpdate(articleId, {"saved": true}, function (err, updated) {

    });

    // Scraped.findByIdAndUpdate(id, updatedObj, {new: true}, function(error, updated){
    //     if (error){
    //         console.log("Something wrong when updating data at /api/saved:id");
    //     }
    //     else {
    //         console.log("UPDATED: " + updated);
    //         // res.send();
    //     }
    // });
});


// 4. At the "/saved" path display all the saved articles
router.get("/saved", function (req, res) {
    Scraped.find({ "saved": true }, function (error, found) {
        // Log any errors
        if (error) {
            console.log(error);
        } else {
             // Otherwise, render the result of the query as handlebars
            res.render("saved", {saved: found});
        }
    });
});

module.exports = router;