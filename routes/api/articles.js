const router = require('express').Router();
const articleController = require('../../controller/article');

router.get('/', articleController.findAll)
    .delete('/:id', articleController.delete)
    .put('/favorites/:id', articleController.updateFavorites)
    .put('/unfavorites/:id', articleController.updateUnfavorites);

module.exports = router;
