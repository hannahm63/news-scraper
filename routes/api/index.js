const router = require('express').Router();
const scrapeRoutes = require('./scrapes');
const articleRoutes = require('./articles');
const noteRoutes = require('./notes');

router.use('/scrape', scrapeRoutes);
router.use('/articles', articleRoutes);
router.use('/notes', noteRoutes);

module.exports = router;