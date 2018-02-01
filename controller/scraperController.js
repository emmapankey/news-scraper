// *** Dependencies
// =============================================================
// Require request and cheerio. This makes the html scraping possible.
var request = require("request");
var cheerio = require("cheerio");

// Use Mongoose models
var Scraped = require("../model/scraped");
var Saved = require("../model/saved");


// Scrape data from the site and place it into the mongodb db
module.exports = function scrapeThis(callback) {
    // Make a request for the news section of ycombinator
    request("https://news.ycombinator.com/", function (error, response, html) {

        if (error) {
            console.log("Error scraping articles: " + error);
        }

        // Load the html body from request into cheerio
        var $ = cheerio.load(html);

        // For each element with a "title" class
        $(".title").each(function (i, element) {
            // Save the text and href of each link enclosed in the current element
            var title = $(element).children("a").text();
            var link = $(element).children("a").attr("href");

            // If this found element had both a title and a link
            if (title && link) {
                // Insert the article in the Scraped collection
                var scrapedArticle = new Scraped({
                    title: title,
                    link: link
                },
                    function (err, inserted) {
                        if (err) {
                            // Log the error if one is encountered during the query
                            console.log(err);
                        }
                        else {
                            // Otherwise, log the inserted data
                            console.log(inserted);
                        }
                    });
                scrapedArticle.save(function (error) {
                    if (error) {
                        console.log("Error saving article: " + error);
                    }
                    else {
                        // Send a "Scrape Complete" message to the browser
                        res.send("Scrape Complete");
                    }
                });
            }
            callback();
        });
    // end request
    });
// end function
}

