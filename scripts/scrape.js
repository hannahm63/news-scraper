// importing tools for scraping site(s)
const axios = require('axios');
const cheerio = require('cheerio');

// GET route using axios and cheerio to scrape TechCrunch website
const scrape = function () {
    return axios
        .get('https://techcrunch.com/')
        .then(function (response) {
            const $ = cheerio.load(response.data);
            console.log('scraping');
            let articles = [];

            $('div.post-block').each(function (i, element) {
                let title = $(element).find('.post-block__title__link').text().trim();
                let link = $(element).find('.post-block__title__link').attr('href');
                let summary = $(element).find('.post-block__content').text().trim();
                let publishDate = $(element).find('.river-byline__time').attr('datetime');
                let author = $(element).find('.river-byline__authors').children('a').text().trim();

                if (title && link) {
                    var scrapedArticles = {
                        title: title,
                        link: link,
                        summary: summary,
                        publishDate: publishDate,
                        author: author
                    };
                }
                articles.push(scrapedArticles);
            });
            console.log(`Scraped Articles: ${articles}`);
            return articles;
        });
};

module.exports = scrape;