'use strict';

let querystring = require('querystring');
let router = require('express').Router();
let User = require('../models/user');

router.get('/me', function(req, res, next) {
	let user = new User();
	user.find().then(function(result) {
		res.send(result);
	}).catch(function(err) {
		next(err)
	})
 });

module.exports = router;