// Require Mongoose
var mongoose = require("mongoose");

// Require db connection
var db = require("../config/connection");

// Create scraped article schema
var scrapedSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        unique: true,
        validate: {
            validator: function (text) {
                return text.indexOf("https://www.newscientist.com/") === 0;
            },
            message: "Article handle must start with https://www.newscientist.com/"
        }
    },
    photo: Buffer,
    created: {
        type: Date,
        default: Date.now
    },
    saved: {
        type: Boolean,
        default: false
    }
    // note: [{
    //     type: Schema.Types.ObjectId,
    //     // ObjectIds refer to the ids in the Note collection
    //     ref: "Note"
    //   }]
});

// Create Scraped model with the scrapedSchema
var Scraped = mongoose.model("Scraped", scrapedSchema);

// Export the Scraped model
module.exports = Scraped;