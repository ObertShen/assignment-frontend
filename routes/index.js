'use strict';

let querystring = require('querystring');
let router = require('express').Router();

router.get('/index', function(req, res, next) {
	// let param = {sessionToken: req.query.sessionToken};
	// console.log(req.query.sessionToken);
    res.redirect(301, 'https://www.baidu.com'); 
 });

module.exports = router;