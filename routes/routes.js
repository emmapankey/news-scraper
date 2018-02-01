// Routes
// =============================================================

// 1. At the "/" path display every entry in the scraped collection 
app.get("/", function (req, res) {
    // Query: In the news database, go to the scraped collection, then "find" everything (all scraped articles)
    db.scraped.find({}, function (error, found) {
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

// 2. At the "/saved" path display every entry in the saved collection
app.get("/saved", function (req, res) {
    // Query: In the news database, go to the saved collection, then "find" everything (all articles saved by user) and sort by date saved
    db.saved.find().sort({created: 1}, function (error, found) {
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