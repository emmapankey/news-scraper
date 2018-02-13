// Require Mongoose
var mongoose = require("mongoose");

// Require db connection
var db = require("../config/connection");

// Create note for article notes schema
var noteSchema = mongoose.Schema({
    noteText: {
        type: String,
        required: true
    }
});

// Create Note model with the scrapedSchema
var Note = mongoose.model("Note", noteSchema);

// Export the Note model
module.exports = Note;