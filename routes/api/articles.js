const router = require('express').Router();
const artileController = require('../../controller/article');

router.get('/', artileController.findAll)
    .delete('/:id', artileController.delete)
    .put('/:id', artileController.update);

module.exports = router;
