'use strict';

let querystring = require('querystring');
let router = require('express').Router();
let Product = require('../models/product');
let Store = require('../utils/qiniu_helper');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });


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
''
 router.post('/products', upload.single('displayImage'), function(req, res, next) {
	Store(req.file).then(function(imgUrl) {
		let product = new Product();
    	req.body.imgURL = imgUrl;
    	req.body.discount = Math.round(100*(1-req.body.realPrice/req.body.fakePrice));
    	req.body.createdAt = Math.round(new Date().getTime()/1000);
    	req.body.updatedAt = req.body.createdAt;
		return product.add(req.body);
	}).then(function(result) {
		res.redirect(302, "/products");
	}).catch(function(err) {
		next(err);
	});
 });

 router.get('/product_add', function(req, res, next) {
	res.sendFile('/product_add.html', {root: './public'});
});

router.get('/product_detail', function(req, res, next) {
	let product = new Product(req.query.productID);
	console.log(req.query.productID);
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