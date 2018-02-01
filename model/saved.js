// Require Mongoose
var mongoose = require("mongoose");

// Require db connection
var db = require("../config/connection");

// Create saved article schema
var savedSchema = mongoose.Schema({
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
    }
});

// Create Saved model with the savedSchema
var Saved = mongoose.model("Saved", savedSchema);

// Export the Saved model
module.exports = Saved;