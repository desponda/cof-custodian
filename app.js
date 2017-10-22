/*jslint node: true */
"use strict";
var custodian = require('./services/custodian');

function start() {
    console.log("Hello, World");
    custodian.execute();
}

setInterval(start, 3000);