'use strict';

let getDBClient = require('./db')

let User = function(userID) {
  this.userID = userID;
  this.conn = null;
};

User.prototype._conndb = function() {
    return getDBClient();
}

User.prototype.find = function() {
    let that = this;
    return new Promise(function(resolve, reject) {
        that._conndb().then(function(db){
            let collection = db.collection('user');
            collection.find({'name': 'shen'}).toArray(function(err, docs) {
                if (err) reject(err);
                else resolve(docs);
            });
        }).catch(function(err) {
            reject(err);
        });
    });
};

User.prototype.login = function(form) {
    return this._get({email: form.email, password: form.password});
};

User.prototype._get = function(obj) {
    let that = this;
    return new Promise(function(resolve, reject) {
        that._conndb().then(function(db){
            let collection = db.collection('user');
            collection.find(obj).toArray(function(err, docs) {
                if (err) reject(err);
                else resolve(docs[0]);
            });
        }).catch(function(err) {
            reject(err);
        });
    });
};


User.prototype.register = function(form) {
    return this._add({name:form.name, email: form.email, password: form.password});
};

User.prototype._add = function(obj) {
    let that = this;
    return new Promise(function(resolve, reject) {
        that._conndb().then(function(db){
            let collection = db.collection('user');
            collection.insertOne(obj, function(err, result) {
                if (err) reject(err);
                else resolve(result);
            });
        }).catch(function(err) {
            reject(err);
        });
    });
};

module.exports = User;





