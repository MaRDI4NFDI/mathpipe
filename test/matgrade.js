"use strict";

// Run jshint as part of normal testing
require('mocha-jshint')();
var assert = require('assert');
var matgrade = require('../lib/matgrade');
var pipe = require('../');

describe('Index', function () {
    it('should process a simple file', function () {
        this.timeout(50000);
        var urlA = pipe.config.conf.mathoid_url;
        return pipe.processFile('../test/files/simple-format.json', matgrade.mainPipe(urlA, urlA));
    });
});
