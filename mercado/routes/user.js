'use strict';

let router = require('express').Router();
let User = require('../models/user');
let crypto = require('crypto');

router.get('/me', function(req, res, next) {
	let user = new User();
	user.find().then(function(result) {
		res.send(result);
	}).catch(function(err) {
		next(err)
	});
 });

router.get('/login', function(req, res, next) {
	res.sendFile('/login.html', {root: './public'});
 });

router.post('/login', function(req, res, next) {
	let user = new User();
	if (req.body) {
		req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex')
		user.login(req.body).then(function(result) {
		if (result) res.render('index', {user: {result}});
		else res.redirect(302, '/login');
		}).catch(function(err) {
			next(err);
		});
	} 
 });

 router.get('/signup', function(req, res, next) {
	res.sendFile('/signup.html', {root: './public'});
 });

router.post('/signup', function(req, res, next) {
	let user = new User();
	if (req.body) {
		req.body.createdAt = Math.round(new Date().getTime()/1000);
    	req.body.updatedAt = req.body.createdAt;
		req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');
		user.register(req.body).then(function(result) {
		if (result) res.render('index', {user: {result}});
		else res.redirect(302, '/signup');
		}).catch(function(err) {
			next(err);
		});
	} 
 });

module.exports = router;