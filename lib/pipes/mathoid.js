"use strict";
var rp = require('request-promise');
var file = require('../file');
var urlencode = require('urlencode');
var BB = require('bluebird');

var getFormatWriter = function (fmt, uri, getFolder, fileName) {
    fileName = fileName || {
            svg: 'mathoid.svg',
            mml: 'mathoid.mml',
            png: 'mathoid.png'
        }[fmt];
    return getFolder.then(function (folder) {
        var options = {
            uri: uri + fmt,
            method: 'POST',
            body: {
                q: folder.tex
            },
            json: true,
            encoding: null,
            simple: true
        };
        return rp(options).then(function (content) {
            return file.save(folder.path, fileName, content);
        });
    });
};

module.exports.getOutputs = function (getFolder, uri, formats) {
    formats = formats || ['svg', 'mml', 'png'];
    var outputs = new Map();
    formats.forEach(function (fmt) {
        outputs.set(fmt, getFormatWriter(fmt, uri, getFolder));
    });
    return BB.all(outputs);
};
