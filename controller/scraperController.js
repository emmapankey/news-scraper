// *** Dependencies
// =============================================================
// Require request and cheerio. This makes the html scraping possible.
var request = require("request");
var cheerio = require("cheerio");
// ADDED MONGOOSE
var mongoose = require("mongoose");

// Use Mongoose models
var Scraped = require("../model/scraped");
var Saved = require("../model/saved");

// Scrape data from the site and place it into the mongodb db
exports.scrapeThis = (function() { 
    // Make a request for the news section of ycombinator
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
                        // function (err, inserted) {
                        //     if (err) {
                        //         // Log the error if one is encountered during the query
                        //         console.log(err);
                        //     }
                        //     else {
                        //         // Otherwise, log the inserted data
                        //         console.log(inserted);
                        //     }
                        // });
                    scrapedArticle.save(function (error) {
                        if (error) {
                            console.log("Error saving article: " + error);
                        }
                        else {
                            // Send a "Scrape Complete" message to the browser
                            // res.send("Scrape Complete");
                        }
                    });
                }
            });
        // end request
        });
        // callback();
        
    // end function
    });