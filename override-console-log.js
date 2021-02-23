#!/usr/bin/env node

// 'use strict';

function overrideConsoleLog(debug, spacer = '  ') {
    var _log = console.log;
    var _info = console.info;
    var _debug = console.debug;
    var _warn = console.warn;
    var _error = console.error;

    if (debug !== 'true') {
        console.log = function () { };
        console.info = function () { };
        console.debug = function () { };
        console.warning = function () { };
        console.error = function () { };
        return;
    }

    console.log = function (message) {
        message = `${spacer}${message}`;
        arguments[0] = message;
        _log.apply(console, arguments);
    };

    console.info = function (message) {
        message = `${spacer}${"\033[0;34mINFO:\033[0m"} ${message}`;
        arguments[0] = message;
        _info.apply(console, arguments);
    };

    console.debug = function (message) {
        message = `${spacer}${"\033[1;30mDEBUG:\033[0m"} ${message}`;
        arguments[0] = message;
        _debug.apply(console, arguments);
    };

    console.warning = function (message) {
        message = `${spacer}${"\033[0;33mWARNING:\033[0m"} ${message}`;
        arguments[0] = message;
        _warn.apply(console, arguments);
    };

    console.error = function (message) {
        message = `${spacer}${"\033[0;31mERROR:\033[0m"} ${message}`;
        arguments[0] = message;
        _error.apply(console, arguments);
    };
}

module.exports = overrideConsoleLog;
