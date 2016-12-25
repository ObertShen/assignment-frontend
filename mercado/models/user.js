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
    let that = this;
    return new Promise(function(resolve, reject) {
        that._conndb().then(function(db){
            let collection = db.collection('user');
            collection.find({'email': form.email, 'password': form.password}).toArray(function(err, docs) {
                if (err) reject(err);
                else resolve(docs[0]);
            });
        }).catch(function(err) {
            reject(err);
        });
    });
};

User.prototype.register = function(form) {
    let that = this;
    return new Promise(function(resolve, reject) {
        that._conndb().then(function(db){
            let collection = db.collection('user');
            collection.insertOne({name:form.name, email: form.email, password: form.password}, function(err, result) {
                if (err) reject(err);
                else resolve(result);
            });
        }).catch(function(err) {
            reject(err);
        });
    });
};

module.exports = User;





