var mongoose = require("mongoose");

var scrapedSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    headline: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    url: {
        type: String,
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
    }
});

var Scraped = mongoose.model("Scraped", scrapedSchema);

module.exports = Scraped;