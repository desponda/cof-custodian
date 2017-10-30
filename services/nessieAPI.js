/*jslint node: true */
"use strict";
var api_key = process.env.API_KEY;
var url = "http://api.reimaginebanking.com/";
var request = require('request');

module.exports.accountService = function accountService() {
    this.getAccounts = function (callback) {
        request(url + 'accounts?key=' + api_key, function (error, response, body) {
            if (error) {
                console.error("Error! " + error + response);
            } else {
                callback(JSON.parse(body));
            }
        });
    };
};




