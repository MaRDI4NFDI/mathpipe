"use strict";
var mathoid = require('./pipes/mathoid.js');
var texstring = require('./pipes/texstring.js');
var equals = require('array-equal');
var BB = require("bluebird");


module.exports.mainPipe = function (urlA, urlB) {
    return function (jobs, folder, input, ff) {
        jobs.push(BB.join(
            mathoid.getStream(input, urlA, 'png'),
            mathoid.getStream(input, urlB, 'png'),
            function (resA, resB) {
                if(!equals(resA,resB)){
                    console.log("failure");
                } else {
                    console.log("OK");
                }
            }));
        return ff;
    };
};

