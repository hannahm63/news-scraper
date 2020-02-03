const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    _articleId: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    },
    date: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String,
        required: [true, "Please don't leave an empty note :("]
    }
});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;