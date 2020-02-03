const router = require('express').Router();
const noteController = require('../../controller/note');

router
    .get('/:id', noteController.find)
    .post('/', noteController.create)
    .delete('/:id', noteController.delete);

module.exports = router;
