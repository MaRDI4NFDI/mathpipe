"use strict";
var rp = require('request-promise');
var file = require('../file');
var BB = require('bluebird');
var errors = require('request-promise/errors');

var getReqOpt = function (uri, fmt, tex) {
    return {
        uri: uri + fmt,
        method: 'POST',
        body: {
            q: tex
        },
        json: true,
        encoding: null,
        simple: true
    };
};

var getFormatWriter = function (fmt, uri, getFolder, fileName) {
    fileName = fileName || {
            svg: 'mathoid.svg',
            mml: 'mathoid.mml',
            png: 'mathoid.png'
        }[fmt];
    return getFolder.then(function (folder) {
        var options = getReqOpt(uri, fmt, folder.tex);
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

module.exports.getStream = function (tex, uri, fmt) {
    return rp(getReqOpt(uri, fmt, tex))
        // Use the error codes for statusCode errors
        .catch(errors.StatusCodeError, function (e) {
            return [e.statusCode];
        });
};
