'use strict';

let checkDBClient = require('../models/db'); 

module.exports = function(req, res, next) {
    checkDBClient().then(function(db) {
        next();
    }).catch(function(err) {
        next(err);
    });
};