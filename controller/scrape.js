const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    scrapeArticles: function (req, res) {
        axios
            .get('https://techcrunch.com/')
            .then(function (response) {
                const $ = cheerio.load(response.data);
                console.log('scraping');

                $('div.post-block').each(function (i, element) {
                    let article = {
                        title: $(element).find('.post-block__title__link').text().trim(),
                        link: $(element).find('.post-block__title__link').attr('href'),
                        summary: $(element).find('.post-block__content').text().trim(),
                        publishDate: $(element).find('.river-byline__time').attr('datetime'),
                        author: $(element).find('.river-byline__authors').children('a').text().trim()
                    };

                    db.Article
                        .update({ link: article.link }, article, { upsert: true })
                        .then(function (dbArticle) {
                            console.log(dbArticle);
                        })
                        .catch(function (err) {
                            console.log(err);
                        });;
                })
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
}
