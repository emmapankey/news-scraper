// *** Dependencies
// =============================================================
var express = require("express");
var router = express.Router();
var Scraped = require("../model/scraped.js");
var Note = require("../model/note.js");
var path = require("path");

// Require request and cheerio. This makes the html scraping possible.
var request = require("request");
var cheerio = require("cheerio");

var mongoose = require("mongoose");



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

// 2. At the "/api/scrape" make request to page for html scraping
router.get("/api/scrape", function (req, res) {
    request("https://www.newscientist.com/", function (error, response, html) {

        if (error) {
            console.log("Error scraping articles: " + error);
        }

        // Load the html body from request into cheerio
        var $ = cheerio.load(html);

        // For each li element
        $("li").each(function (i, element) {
            // Save the text and href of each link enclosed in the current element
            var url = $(element).children("a").attr("href");
            var headline = $(element).children("div").children("a").children("h2").text();
            var summary = $(element).children("div").children("a").children("p").text();
            var photo = $(element).children("a").children("img").attr("src");

            // If this found element had both a title and a link
            if (headline && url) {
                // Insert the article in the Scraped collection
                var scrapedArticle = new Scraped({
                    _id: new mongoose.Types.ObjectId(),
                    headline: headline,
                    summary: summary,
                    url: url,
                    photo: photo,
                });

                scrapedArticle.save(function (error, doc) {

                });
            }
        });
        res.redirect("/");
    });

});

// 3. At the "/api/save/:id" path update the article's saved key to true in the Scraped document
router.put("/api/saved/:id", function (req, res) {

    // Use the article id to find and update it's saved property
    var id = req.params.id;
    // console.log("id is: " + id);

    var updatedObj = { "saved": true };

    Scraped.findByIdAndUpdate(id, updatedObj, { new: true }, function (err, found) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Article Saved: " + id);
        }
    });
});

// 4. At the "/saved" path display all the saved articles
router.get("/saved", function (req, res) {
    Scraped.find({ "saved": true }, function (error, found) {
        // Log any errors
        if (error) {
            console.log(error);
        } else {
            // Otherwise, render the result of the query as handlebars
            res.render("saved", { saved: found });
        }
    });
});

//5. "Delete" a saved article by changing the saved status to false
router.post("/api/delete/:id", function (req, res) {
    // Use the article id to find and update it's saved property
    var id = req.params.id;

    var updatedObj = { "saved": false };

    Scraped.findByIdAndUpdate(id, updatedObj, { new: true }, function (err, found) {
    })
    res.send("Article Deleted");
});

// get notes route
router.get('/api/note/:id', function(req, res) 
{
	Scraped.findOne({_id: request.params.id})
		.populate("note")
		.exec(function(error, doc) {
			if (error) console.log("error getting notes", error);

			res.send(doc.note);
			
		});
});

//6. At the "api/note:id" create a new note for a saved article
router.post("/api/note/:id", function (req, res) {
    const id = req.params.id;
    // console.log(id);
    // console.log(req.body);

    var newNote = new Note(req.body);

    newNote.save(function (error, doc) {

        console.log(doc);
        Scraped.findOneAndUpdate(
            { _id: id },
            {note: doc._id },
            { new: true }
        ).then(function (err, doc2) {
            if (err) {
                console.log("Error posting note: " + err);
            }
            else {
                res.send(doc2);
            }
        });
    });
});

module.exports = router;