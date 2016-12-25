'use strict';

let getDBClient = require('./db');
let ObjectID = require('mongodb').ObjectID;


let Product = function(productID) {
  this.productID = productID;
  this.conn = null;
};

Product.prototype._conndb = function() {
    return getDBClient();
}

Product.prototype.find = function() {
    let that = this;
    return new Promise(function(resolve, reject) {
        that._conndb().then(function(db) {
            let collection = db.collection('product');
            collection.find({}).toArray(function(err, docs) {
                if (err) reject(err);
                else resolve(docs);
            });
        }).catch(function(err) {
            reject(err);
        })
    });
};

Product.prototype.get = function() {
    let that = this;
    return new Promise(function(resolve, reject) {
        that._conndb().then(function(db){
            let collection = db.collection('product');
            collection.find({_id: ObjectID(that.productID)}).toArray(function(err, docs) {
                if (err) reject(err);
                else resolve(docs);
            });
        }).catch(function(err) {
            reject(err);
        })
    });
};

Product.prototype.add = function(newProduct) {
    let that = this;
    return new Promise(function(resolve, reject) {
        that._conndb().then(function(db){
            let collection = db.collection('product');
            collection.insertOne(newProduct, function(err, result) {
                if (err) reject(err);
                else resolve(result);
            });
        }).catch(function(err) {
            reject(err);
        })
    });
};

module.exports = Product;





