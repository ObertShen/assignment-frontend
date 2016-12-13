'use strict';

let querystring = require('querystring');
let router = require('express').Router();

router.get('/me', function(req, res, next) {
	// let param = {sessionToken: req.query.sessionToken};
	// console.log(req.query.sessionToken);
    res.send("Hello world"); 
 });

module.exports = router;