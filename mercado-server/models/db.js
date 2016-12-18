'use strict';

let MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

  // Connection URL
let connUrl = 'mongodb://123.56.166.67:27017/mercado';

let dbConn = null;

// Use connect method to connect to the server
let connectToMongo = function() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(connUrl, function(err, db) {
      if (err === null) {
        console.log("Connected successfully to server");
        dbConn = db
        resolve(db);
      } else {
        console.log("Connected failed to server");
        reject(err);
      }
    });
  });
};

module.exports = function() {
    return new Promise(function(resolve, reject) {
      if (dbConn === null) return connectToMongo();
      else resolve(dbConn)
    });
}