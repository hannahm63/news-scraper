const express = require("express");
const router = express.Router();

// importing tools for scraping site(s)
const axios = require('axios');
const cheerio = require('cheerio');

// requiring models for db
const db = require("../models");

// GET route to scrape TechCrunch website and add articles to Article Collection in MongoDB
router.get('/scrape', function (req, res) {

    axios
        .get('https://techcrunch.com/')
        .then(function (response) {
            const $ = cheerio.load(response.data);

            $('div.post-block').each(function (i, element) {
                db.Article
                    .create(
                        {
                            title: $(element).find('.post-block__title__link').text(),
                            link: $(element).find('.post-block__title__link').attr('href'),
                            summary: $(element).find('.post-block__content').text(),
                            publishDate: $(element).find('.river-byline__time').attr('datetime'),
                            author: $(element).find('.river-byline__authors').children('a').text()
                        }
                    )
                    .then(function () {
                        console.log("Scraping articles");
                    })
            });
        })
        .then(function () {
            res.redirect("/");
        })
});

module.exports = router;