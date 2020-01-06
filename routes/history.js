const express = require('express'),
    Stock = require('../models/stock'),
    Measure = require("../models/measures"),
    middleware = require('../middleware'),
    passport = require('passport'),
    router = express.Router({ mergeParams: true });

module.exports = router;