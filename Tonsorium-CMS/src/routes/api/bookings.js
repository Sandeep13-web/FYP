const express = require('express');
const router = express.Router();
const { container } = require("@container");
const { checkPermission } = require('@middleware');
const apiBookingsController = container.resolve('apiBookingsController');
const {validate} = require("@middleware");
const wrapNext = require('@wrapNext');


router.post('/', [ validate], wrapNext(apiBookingsController.save));
// router.get('/', wrapNext(apiBookingsController.getAll));

module.exports = router;