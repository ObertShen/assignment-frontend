'use strict';

let querystring = require('querystring');
let router = require('express').Router();
let Product = require('../models/product');

router.get('/products', function(req, res, next) {
	let product = new Product();
	product.find().then(function(result) {
		res.render('products', {
            products: result,
        });
	}).catch(function(err) {
		next(err)
	});
 });

 router.post('/products', function(req, res, next) {
	let product = new Product();
    if (req.body.imgURL) req.body.imgURL = "images/e1.png";
    req.body.discount = Math.round(100*(1-req.body.realPrice/req.body.fakePrice));
    req.body.createdAt = Math.round(new Date().getTime()/1000);
    req.body.updatedAt = req.body.createdAt;
	product.add(req.body).then(function(result) {
        res.redirect(302, "/products");
	}).catch(function(err) {
		next(err);
	});
 });

router.get('/product_detail', function(req, res, next) {
	let product = new Product(req.query.productID);
    product.get().then(function(result) {
		if (result.length != 0) {
			console.log(result);
			res.render('single', {
            	product: result[0],
        	});
		} else {
			res.redirect(302, "/products");
		}
	}).catch(function(err) {
		next(err);
	});
});

module.exports = router;