const express = require('express');
const router = express.Router();
const { container } = require("@container");
const apiStaffsController = container.resolve('apiStaffsController');
const {validate} = require("@middleware");

const wrapNext = require('@wrapNext');

router.post('/', [ validate], wrapNext(apiStaffsController.register));
router.get('/', wrapNext(apiStaffsController.getAll));
router.get('/:id', wrapNext(apiStaffsController.getbyId));
router.put('/:id', [ validate], wrapNext(apiStaffsController.updateServices));
router.delete('/:id', wrapNext(apiStaffsController.deleteSerices));

module.exports = router;