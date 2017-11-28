/*jslint node: true */
"use strict";
var custodian = require('./services/custodian');

function start() {
    custodian.execute();
}

setInterval(start, 10000);