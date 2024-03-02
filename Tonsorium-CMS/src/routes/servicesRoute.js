const express = require('express');
const router = express.Router();
const { container } = require("@container");
const servicesController = container.resolve('servicesController');
const {  validate } = require('@middleware');
const wrapNext = require('@wrapNext');

router.get('/', wrapNext(servicesController.index));
router.get('/create', wrapNext(servicesController.addView));
router.post('/', [validate], wrapNext(servicesController.add));
router.get('/:id', wrapNext(servicesController.editView));
router.put('/:id', [validate], wrapNext(servicesController.edit));
router.delete('/:id', wrapNext(servicesController.delete));

module.exports = router;