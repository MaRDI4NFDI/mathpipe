"use strict";
var mathoid = require('../../lib/pipes/mathoid.js');
var validTests = require('../files/hash.json');
var invalidTests = require('../files/invalid.json');
var pipe = require('../..');
var assert = require('assert');
var BB = require('bluebird');

describe('mathoid', function () {
    validTests.forEach(function (tc) {
        it('vaild sample ' + JSON.stringify(tc.input), function () {
            this.timeout(5000);
            var getFoder = pipe.getFolder(tc.input, pipe.config.conf.out_dir);
            return BB.map(mathoid.getOutputs(getFoder, pipe.config.conf.mathoid_url), function (format) {
                return format[1].then(function (file) {
                    assert.ok(file.indexOf(tc.inputhash) > 0);
                });
            });
        });
    });
    invalidTests.forEach(function (tc) {
        it('invalid sample ' + JSON.stringify(tc.input), function () {
            this.timeout(5000);
            var getFoder = pipe.getFolder(tc.input, pipe.config.conf.out_dir);
            return BB.map(mathoid.getOutputs(getFoder, pipe.config.conf.mathoid_url), function (format) {
                return format[1].then(function (file) {
                    assert.ok(file.indexOf(tc.inputhash) > 0);
                });
            }).catch(function (e) {
                assert.equal(e.name, 'StatusCodeError');
            });
        });
    });
});