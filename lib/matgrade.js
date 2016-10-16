"use strict";
var mathoid = require('./pipes/mathoid.js');
var texstring = require('./pipes/texstring.js');


module.exports.mainPipe = function (urlA, urlB) {
    return function (jobs, folder, input, ff) {
        jobs.push(texstring(folder).then(function (res) {
            // console.log(JSON.stringify(res) + j++);
        }));
        jobs.push(mathoid.getOutputs(folder, urlA, ['png']));
        jobs.push(mathoid.getOutputs(folder, urlB, ['png']));
        return ff;
    };
};

