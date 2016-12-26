'use strict';

let router = require('express').Router();
let User = require('../models/user');

router.get('/home', function(req, res, next) {
	res.render('index', {user: {_id:''}});
 });

module.exports = router;