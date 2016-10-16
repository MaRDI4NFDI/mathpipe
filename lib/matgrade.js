"use strict";
var mathoid = require('./pipes/mathoid.js');
var texstring = require('./pipes/texstring.js');
var equals = require('array-equal');
var BB = require("bluebird");


module.exports.mainPipe = function (urlA, urlB) {
    return function (jobs, base, input, ff) {
        jobs.push(BB.join(
            mathoid.getStream(input, urlA, 'png'),
            mathoid.getStream(input, urlB, 'png'),
            function (resA, resB) {
                if (resA === resB || equals(resA, resB)) {
                    console.log("OK for " + input);
                } else if (typeof resA === "number") {
                    if (typeof resB === "number") {
                        console.log("different error codes for " + input);
                        console.log("uriA had error code " + resA);
                        console.log("uriB had error code " + resB);
                    } else {
                        console.log("failure for " + input);
                        console.log("uriA had error code " + resA);
                        console.log("uriB had no error");
                    }
                } else if (typeof resB === "number") {
                    console.log("failure for " + input);
                    console.log("uriA had no error");
                    console.log("uriB had error code " + resB);
                } else {
                    console.log("failure for " + input);
                    console.log("results differ");
                }
            }));
        return ff;
    };
};

