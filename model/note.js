// Require Mongoose
var mongoose = require("mongoose");

// Require db connection
var db = require("../config/connection");

// Create note for article notes schema
var NoteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    noteText: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Create Note model with the scrapedSchema
var Note = mongoose.model("Note", noteSchema);

// Export the Note model
module.exports = Note;