
const express = require('express');
const router = express.Router();
const auth = require('./auth');
const apiuser = require('./apiUser');
const services = require('./services');
const staffs = require('./staffs');
const bookings = require('./bookings');
const passport = require('passport');

router.use('/auth', auth);
router.use('/users', [passport.authenticate('bearer', {session: false})], apiuser);
router.use('/services', services);
router.use('/staffs', staffs);
router.use('/bookings', bookings);

module.exports = router;