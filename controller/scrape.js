const db = require('../models');
const scrape = require('../scripts/scrape');

module.exports = {
    scrapeArticles: function (req, res) {
        return scrape()
            .then(function (articles) {
                // then insert articles into the db
                return db.Article.update(articles, { link: articles.link }, { upsert: true });
            })
            .then(function (dbArticle) {
                if (dbArticle.length === 0) {
                    res.json({
                        message: "You have viewed all of the articles today."
                    });
                }
                else {
                    res.json({
                        message: `Here are ${dbArticle.length} new articles for you to view!`
                    });
                }
            })
            .catch(function (err) {
                res.json({
                    message: "Scrape completed"
                });
            });
    }
};
