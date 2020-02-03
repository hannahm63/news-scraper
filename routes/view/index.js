const router = require('express').Router();
const db = require('../../models');

// renders homepage
router.get('/', function (req, res) {
    db.Article.find({ favorited: false })
        .sort({ publishDate: -1 })
        .then(function (dbArticles) {
            res.render('home', { articles: dbArticles });
        });
});

// renders saved 
router.get('/favorited', function (req, res) {
    db.Article.find({ favorited: true })
        .sort({ publishDate: -1 })
        .then(function (dbArticles) {
            res.render('favorited', { articles: dbArticles });
        });
});

module.exports = router;