"use strict";

// Run jshint as part of normal testing
require('mocha-jshint')();
var assert = require('assert');
var pipe = require('../');
var testcases = require('./files/hash.json');
var invalidTests = require('./files/invalid.json');

describe('Index', function () {
    testcases.forEach(function (tc) {
        it('should calculate hash for ' + JSON.stringify(tc.input), function () {
            assert.deepEqual(pipe.getHash(tc.input), tc.inputhash);
        });
        it('should create dirs ' + JSON.stringify(tc.input), function () {
            return pipe.getFolder(tc.input, pipe.config.conf.out_dir).then(function (folder) {
                var f = folder.path;
                assert.equal(f.indexOf(pipe.config.conf.out_dir), 0);
                assert.ok(f.indexOf(tc.inputhash) > 0);
                assert.ok(f.split('/').length > 4);
            });
        });
    });
    invalidTests.forEach(function (tc) {
        it('should calculate hash for ' + JSON.stringify(tc.input), function () {
            assert.deepEqual(pipe.getHash(tc.input), tc.inputhash);
        });
    });
    it('should process a file', function() {
        this.timeout(50000);
        var tmp = pipe.config.conf.chunk_size;
        pipe.config.conf.chunk_size = 2;
        return pipe.processFile('../test/files/extended.json', pipe.mainPipe)
            .then(function(){
                 pipe.config.conf.chunk_size =  tmp;
            });
    });
    it('should process a simple file', function() {
        this.timeout(50000);
        return pipe.processFile('../test/files/simple-format.json', pipe.mainPipe);
    });
    it('should process a unusually formatted file', function() {
        this.timeout(50000);
        return pipe.processFile('../test/files/unusual-format.json', pipe.mainPipe);
    });
});
