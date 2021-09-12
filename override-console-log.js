#!/usr/bin/env node

// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//

// 'use strict';

function overrideConsoleLogMethod(debug, method, spacer = '  ') {
    if (debug === 'true') {
        method.f = function (message) {
            var text = method.text ? `${method.color}${method.text}${":\033[0m"} ` : '';
            message = `${spacer}${text}${message}`;
            arguments[0] = message;
            method.f(console, arguments);
        };
    } else {
        method.f = function () { };
    }
}

function overrideConsoleLog(debug, spacer = '  ') {
    var methods = [
        { f: console.log, text: void 0, color: '' },
        { f: console.info, text: 'INFO', color: '\033[0;34m' },
        { f: console.debug, text: 'DEBUG', color: '\033[0;30m' },
        { f: console.warn, text: 'WARN', color: '\033[0;33m' },
        { f: console.error, text: 'ERROR', color: '\033[0;31m' }
    ];

    methods.forEach((_) => { overrideConsoleLogMethod(debug, _, spacer); });
}

module.exports = overrideConsoleLog;
