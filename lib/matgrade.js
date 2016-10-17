"use strict";
var mathoid = require('./pipes/mathoid.js');
var texstring = require('./pipes/texstring.js');
var BB = require("bluebird");
var getFolder = require('./index.js').getFolder;
var file = require('./file.js');

var handleDiffrence = function (A, B, input, base, verbose, urlA, urlB) {
    var log = "log for $" + input + "$ \n\n";
    log += 'A: ' + urlA + "\n";
    log += 'B: ' + urlB + "\n";
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
    var folder = getFolder(input, base);
    return BB.join(
        texstring(folder),
        mathoid.getOutputs(folder, urlA, false, 'A_')
            .catch(function (e) {
            }),
        mathoid.getOutputs(folder, urlB, false, 'B_')
            .catch(function (e) {
            }),
        file.save(folder, 'compare.log', log),
        file.save(folder, 'A.png', A),
        file.save(folder, 'B.png', B)
    );
};

function equals(arr1, arr2) {
    if (typeof arr1 !== "object" || typeof arr2 !== "object") {
        return false;
    }
    var length = arr1.length;
    if (length !== arr2.length) return false;
    for (var i = 0; i < length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

module.exports.matgradePipe = function (urlA, urlB, verbose) {
    return function (jobs, base, input, ff) {
        jobs.push(BB.join(
            mathoid.getStream(input, urlA, 'png'),
            mathoid.getStream(input, urlB, 'png'),
            function (resA, resB) {
                if (resA === resB || equals(resA, resB)) {
                    if (verbose) {
                        //console.log("OK for " + input);
                    }
                } else {
                    handleDiffrence(resA, resB, input, base, verbose, urlA, urlB);
                }
            }));
        return ff;
    };
};

