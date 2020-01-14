const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    name: {type: String,
        required: [true, "Let us know who's leaving this note!"]
    },
    body: {
        type: String,
        required: [true, "Please don't leave an empty note :("]
    } 
});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;