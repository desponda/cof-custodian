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
        else if(condition.type === 'equality') {
            var a = resource[condition.attribute], b = condition.value;
            if( a !== b){
                meetsCondition = false;
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
        else if(action.type === 'transfer') {
            var transfer = {
                medium: "balance",
                payee_id: action.to,
                amount: action.amount,
                transaction_date: "2017-11-27",
                status: "pending",
                description: "automatic transfer"
            };
            accountService.createTransfer(action.from, transfer,function(response) {
                console.info(response);
            });
            notifier.notify("amount transferred")
        }
    });
}


function evaluateCondition(policy) {
    return function (resources) {
        var conditions = policy.conditions;
        resources.forEach(function (resource) {
            var execute = meetsConditions(resource, conditions);
            if (execute) {
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
    else if (policy.resource === 'singleAccount'){
        accountService.getAccount(policy.resourceId, evaluateCondition(policy))
    }
    //evaluate condition
    //execute action
};


