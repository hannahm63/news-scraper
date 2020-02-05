const db = require('../models');

module.exports = {
    findAll: function (req, res) {
        db.Article
            .find(req.query)
            .sort({ publishDate: -1 })
            .then(function (dbArticle) {
                console.log(dbArticle);
                res.send(dbArticle);
            })
            
    },
    delete: function (req, res) {
        db.Article
            .remove({ _id: req.params.id })
            .then(function (dbArticle) {
                res.json(dbArticle);
            });
    },
    updateFavorites: function (req, res) {
        db.Article
            .findOneAndUpdate({ _id: req.params.id }, { $set: { favorited: true } }, { new: true })
            .then(function (dbArticle) {
                res.json(dbArticle);
            });
    },
    updateUnfavorites: function (req, res) {
        db.Article
            .findOneAndUpdate({ _id: req.params.id }, { $set: { favorited: false } }, { new: true })
            .then(function (dbArticle) {
                res.json(dbArticle);
            });
    }
};
