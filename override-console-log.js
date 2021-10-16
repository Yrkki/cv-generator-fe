#!/usr/bin/env node

// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
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
