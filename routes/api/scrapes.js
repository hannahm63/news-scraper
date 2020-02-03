const router = require('express').Router();
const scrapeController = require('../../controller/scrape');

router
    .get('/', scrapeController.scrapeArticles);

module.exports = router;