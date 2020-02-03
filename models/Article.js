const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    publishDate: {
        type: Date
    },
    author: {
        type: String
    },
    favorited: {
        type: Boolean,
        default: false
    },
    dateScraped: {
        type: Date,
        default: Date.now
    }
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;