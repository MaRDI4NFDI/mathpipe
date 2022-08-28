"use strict";
var screenshot = require('../../lib/pipes/screenshot.js');
var testcases = require('../files/hash.json');
var restbase = require('../../lib/pipes/restbase');
var pipe = require('../..');

describe('screenshot', function () {
    testcases.slice(0,2).forEach(function (tc) {
        it.skip('should take screenshot of svg from ' + JSON.stringify(tc.input), function () {
            this.timeout(50000);
            var folder = pipe.getFolder(tc.input, pipe.config.conf.out_dir);
            var getCheck = restbase.check(tc.input, pipe.config.conf.restbase_url);
            var getFormats = restbase.getOutputs(folder, getCheck);
            return getFormats
                .then(function (res) {
                    return res.get('svg')
                        .then(function (svg) {
                            return screenshot.snapshot(svg);
                        });
                });
        });
    });
});
