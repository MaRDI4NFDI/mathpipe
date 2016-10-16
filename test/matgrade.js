"use strict";

// Run jshint as part of normal testing
require('mocha-jshint')();
var assert = require('assert');
var matgrade = require('../lib/matgrade');
var spawn = require('child-process-promise').spawn;
var pipe = require('../');
var BB = require("bluebird");
var path = require('path');
var fs = require('fs-extra-promise');

var clone = function (branch, folder) {
    folder = folder || path.resolve('/tmp/mathoid_' + branch);
    return fs.statAsync(folder)
        .then(function () {
            console.log("removing old clone " + folder);
            return fs.removeAsync(folder);
        })
        .catch(function(e) {})
        .then(function () {
            console.log("Cloning mathoid " + folder);
            return spawn('git', [
                'clone',
                'https://github.com/wikimedia/mathoid',
                '--depth=1',
                '--single-branch',
                '--branch',
                branch,
                folder])
        })
        .then(function () {
            console.log("Installing mathoid " + folder);
            var npm = (process.platform === "win32" ? "npm.cmd" : "npm");
            return spawn(npm, ['i'], {cwd: folder});
        });
};

describe('matgrade', function () {
    before(function () {
        return BB.join(clone('master'), clone('0.6.2'));
        //TODO: Configure mathoid instances
    });
    it('should process a simple file', function () {
        this.timeout(50000);
        var urlA = pipe.config.conf.mathoid_url;
        return pipe.processFile('../test/files/simple-format.json', matgrade.matgradePipe(urlA, urlA));
    });
});
