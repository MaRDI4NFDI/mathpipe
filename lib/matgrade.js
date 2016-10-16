"use strict";
var mathoid = require('./pipes/mathoid.js');
var texstring = require('./pipes/texstring.js');
var equals = require('array-equal');
var BB = require("bluebird");
var getFolder = require('./index.js').getFolder;

var handleDiffrence = function (A, B, input, base, verbose) {
    var log = "log for $" + input + "$ \n\n";
    if (typeof A === "number") {
        if (typeof B === "number") {
            log += "different error codes\n";
            log += "uriA had error code " + A + "\n";
            log += "uriB had error code " + B + "\n";
        } else {
            log += "failure\n";
            log += "uriA had error code " + A + "\n";
            log += "uriB had no error" + "\n";
        }
    } else if (typeof B === "number") {
        log += "failure\n";
        log += "uriA had no error" + "\n";
        log += "uriB had error code " + B + "\n";
    } else {
        log += "failure\n";
        log += "results differ" + "\n";
    }
    if (verbose) {
        console.log(log);
    }
};

module.exports.matgradePipe = function (urlA, urlB, verbose) {
    return function (jobs, base, input, ff) {
        jobs.push(BB.join(
            mathoid.getStream(input, urlA, 'png'),
            mathoid.getStream(input, urlB, 'png'),
            function (resA, resB) {
                if (resA === resB || equals(resA, resB)) {
                    if (verbose) {
                        console.log("OK for " + input);
                    }
                } else {
                    handleDiffrence(resA, resB, input, base, verbose);
                }
            }));
        return ff;
    };
};

