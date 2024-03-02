const express = require('express');
const router = express.Router();
const { container } = require("@container");
const bookingsController = container.resolve('bookingsController');
const {  validate } = require('@middleware');
const wrapNext = require('@wrapNext');

router.get('/', wrapNext(bookingsController.index));

module.exports = router;