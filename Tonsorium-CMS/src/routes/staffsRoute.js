const express = require('express');
const router = express.Router();
const { container } = require("@container");
const staffsController = container.resolve('staffsController');
const {  validate } = require('@middleware');
const wrapNext = require('@wrapNext');

router.get('/', wrapNext(staffsController.index));
router.get('/create', wrapNext(staffsController.addView));
router.post('/', [validate], wrapNext(staffsController.add));
router.get('/:id', wrapNext(staffsController.editView));
router.put('/:id', [validate], wrapNext(staffsController.edit));
router.delete('/:id', wrapNext(staffsController.delete));

module.exports = router;