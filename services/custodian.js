/*jslint node: true */
"use strict";
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var evaluator = require('./evaluator');

module.exports.execute = function () {
    //read policies
    fs.readFile(path.join(__dirname, '../policies/first-policy.yml'), function (err, data) {
        if (err) {
            console.log(err);
        } else {
            yaml.safeLoadAll(data, function (file) {
                file.policies.forEach(function (policy) {
                    evaluator.evaluate(policy);
                });
            });
        }
    });

};
