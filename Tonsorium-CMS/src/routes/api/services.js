const express = require('express');
const router = express.Router();
const { container } = require("@container");
const apiServicesController = container.resolve('apiServicesController');
const {validate} = require("@middleware");

const wrapNext = require('@wrapNext');

router.post('/', [ validate], wrapNext(apiServicesController.register));
router.get('/', wrapNext(apiServicesController.getAll));
router.get('/:id', wrapNext(apiServicesController.getbyId));
router.put('/:id', [ validate], wrapNext(apiServicesController.updateServices));
router.delete('/:id', wrapNext(apiServicesController.deleteSerices));

module.exports = router;