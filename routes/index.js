const express = require('express');

const router = express.Router();

// for user related routes
router.use('/',require('./user'));

// for routes related to admin
router.use('/dashboard/admin',require('./admin'));

// for routes related to employee
router.use('/dashboard/employee',require('./employee'));

module.exports = router;