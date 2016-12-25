'use strict';

let querystring = require('querystring');
let router = require('express').Router();
let User = require('../models/user');

router.get('/login', function(req, res, next) {
	res.sendfile('/login.html', {root: './public'});
 });

module.exports = router;