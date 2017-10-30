/*jslint node: true */
"use strict";
var nessieAPI = require("./nessieAPI");
var notifier = require("./mockNotifier");
var accountService = new nessieAPI.accountService();

function meetsConditions(resource, conditions) {
    var meetsCondition = true;
    conditions.forEach(function (condition) {
        if (condition.type === 'comparison') {
            if (condition.operator === 'lessThan') {
                var a = parseFloat(resource[condition.attribute]), b = parseFloat(condition.value);
                if (a >= b) {
                    meetsCondition = false;
                }
            }
        }
    });
    return meetsCondition;
}

function executeAction(resource, actions) {
    actions.forEach(function (action) {
        if (action.type === 'notify') {
            notifier.notify(resource[action.attribute], action.message);
        }
    });
}


function evaluateCondition(policy) {
    return function (resources) {
        var conditions = policy.conditions;
        resources.forEach(function (resource) {
            if (meetsConditions(resource, conditions)) {
                executeAction(resource, policy.actions);
            }
        });
    };
}

module.exports.evaluate = function (policy) {
    console.info("Evaluating policy: " + policy.name);
    //get context
    if (policy.resource === 'account') {
        accountService.getAccounts(evaluateCondition(policy));
        //future: filters
    }
    //evaluate condition
    //execute action
};


