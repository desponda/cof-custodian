/*jslint node: true */
"use strict";
var account = require("./account");

function evaluateCondition(policy) {
    return function (context) {
        console.info(context[0] + policy);
    };
}

module.exports.evaluate = function (policy) {
    console.info("Evaluating policy: " + policy.name);
    //get context
    if (policy.resource === 'account') {
        account.getAccounts(evaluateCondition(policy));
    }
    //evaluate condition
    //execute action
};


