// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Georgi Marinov
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
import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import * as angular from 'angular-eslint';
import jsdoc from 'eslint-plugin-jsdoc';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['projects/**/*']), {
    languageOptions: {
      globals: {
        globalThis: 'readonly',
        describe: 'readonly',
        fdescribe: 'readonly',
        xdescribe: 'readonly',
        beforeEach: 'readonly',
        it: 'readonly',
        fit: 'readonly',
        xit: 'readonly',
        expect: 'readonly',
        afterEach: 'readonly',
        jasmine: 'readonly',
        console: 'readonly',
        confirm: 'readonly',
        document: 'readonly',
        setTimeout: 'readonly',
        localStorage: 'readonly',
        fetch: 'readonly',
        location: 'readonly',
        Promise: 'readonly',
      },
    },
  },
  {
    files: ['**/*.ts'],

    // extends: compat.extends(
    //   // 'plugin:@angular-eslint/recommended',
    //   // 'plugin:@angular-eslint/template/process-inline-templates',
    // ),
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],

    plugins: {
      jsdoc,
      'prefer-arrow-functions': preferArrowFunctions,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 5,
      sourceType: 'commonjs',

      parserOptions: {
        project: ['tsconfig.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
        ecmaVersion: 2022
      },
    },

    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-max-inline-declarations': 'error',

      '@angular-eslint/component-selector': [
        'error',
        {
          'type': 'element',
          'prefix': 'app',
          'style': 'kebab-case'
        }
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          'type': 'attribute',
          'prefix': 'app',
          'style': 'camelCase'
        }
      ],

      // // 'plugin:@angular-eslint/recommended',
      // '@angular-eslint/component-class-suffix': 'error',
      // '@angular-eslint/contextual-lifecycle': 'error',
      // '@angular-eslint/directive-class-suffix': 'error',
      // '@angular-eslint/no-conflicting-lifecycle': 'error',
      // '@angular-eslint/no-empty-lifecycle-method': 'error',
      // '@angular-eslint/no-host-metadata-property': 'error',
      // '@angular-eslint/no-input-rename': 'error',
      // '@angular-eslint/no-inputs-metadata-property': 'error',
      // '@angular-eslint/no-output-native': 'error',
      // '@angular-eslint/no-output-on-prefix': 'error',
      // '@angular-eslint/no-output-rename': 'error',
      // '@angular-eslint/no-outputs-metadata-property': 'error',
      // '@angular-eslint/use-lifecycle-interface': 'warn',
      // '@angular-eslint/use-pipe-transform-interface': 'error',
      '@angular-eslint/no-attribute-decorator': 'error',
      '@angular-eslint/no-forward-ref': 'error',
      '@angular-eslint/no-lifecycle-call': 'error',
      '@angular-eslint/no-pipe-impure': 'error',
      '@angular-eslint/no-queries-metadata-property': 'error',
      '@angular-eslint/prefer-inject': 'off',
      '@angular-eslint/prefer-output-readonly': 'error',
      '@angular-eslint/use-component-selector': 'error',
      '@angular-eslint/use-component-view-encapsulation': 'error',
      '@typescript-eslint/ban-types': 'off',
      // '@typescript-eslint/ban-types': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          'accessibility': 'explicit',
          'ignoredMethodNames': [],
          'overrides': {
            'accessors': 'explicit',
            'constructors': 'no-public',
            // 'methods': 'explicit',
            'methods': 'off',
            'properties': 'off',
            'parameterProperties': 'explicit'
          }
        }
      ],

      // '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/member-ordering': 'off',
      // '@typescript-eslint/naming-convention': 'error',
      '@typescript-eslint/naming-convention': ['warn', {
        selector: 'variable',
        format: ['camelCase'],
      }],

      '@typescript-eslint/no-shadow': ['error', {
        hoist: 'all',
      }],

      '@typescript-eslint/no-var-requires': 'error',

      'arrow-parens': 'error',

      'brace-style': ['warn', '1tbs', {
        allowSingleLine: true,
      }],

      complexity: ['error', {
        // // max: 20,
        // max: 5,
        max: 10,
      }],

      // 'jsdoc/newline-after-description': 'error',
      'max-classes-per-file': ['error', 1],
      'max-len': ['error', 140],
      // 'max-lines': ['error', 300],
      'max-lines': ['error', 305],
      // // 'max-lines-per-function': ['error', 25],
      // 'max-lines-per-function': ['error', 160],
      // // 'max-statements': ['error', 20],
      // 'max-statements': ['error', 25],
      'max-lines-per-function': ['error', 25],
      'max-statements': ['error', 20],

      // 'no-console': ['error', {
      //   allow: [
      //     'log',
      //     'warn',
      //     'dir',
      //     'timeLog',
      //     'assert',
      //     'clear',
      //     'count',
      //     'countReset',
      //     'group',
      //     'groupEnd',
      //     'table',
      //     'dirxml',
      //     'error',
      //     'groupCollapsed',
      //     'Console',
      //     'profile',
      //     'profileEnd',
      //     'timeStamp',
      //     'context',

      //     'try',
      //     'catch',
      //     '//',
      //   ],
      // }],

      'no-fallthrough': 'warn',
      'no-global-assign': 'error',
      'no-invalid-this': 'off',
      'no-multiple-empty-lines': 'error',
      // 'no-redeclare': 'error',
      'no-shadow': 'off',
      // 'no-underscore-dangle': 'warn',
      'no-undef': 'error',
      'no-undefined': 'off',
      'padded-blocks': ['error', 'never'],
      'prefer-const': 'error',
      'quote-props': ['error', 'as-needed'],
      // // '@/semi': ['error', 'always'],
      // '@typescript-eslint/semi': 'off',
      // '@typescript-eslint/no-array-constructor': 'off',
      // '@typescript-eslint/no-empty-object-type': 'off',
      // '@typescript-eslint/no-explicit-any': 'off',
      // '@typescript-eslint/no-this-alias': 'off',
      // '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      // '@typescript-eslint/no-unused-vars': 'off',
      // '@angular-eslint/prefer-standalone': 'off'

      'prefer-arrow-functions/prefer-arrow-functions': [
        'warn',
        {
          allowedNames: [],
          allowNamedFunctions: false,
          allowObjectProperties: false,
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: 'unchanged',
          singleReturnOnly: false,
        },
      ],

      'no-empty': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-unused-vars': ['off']
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      'max-lines-per-function': 'off',
      'max-statements': 'off',
    },
  },
  {
    files: ['**/*.html'],
    // extends: compat.extends('plugin:@angular-eslint/template/recommended'),
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/cyclomatic-complexity': [
        'error',
        {
          'maxComplexity': 12
        }
      ],
      '@angular-eslint/template/no-autofocus': 'error',
      '@angular-eslint/template/no-positive-tabindex': 'error'
      // ,
      // 'contextual-decorator': 'error',
      // 'no-unused-css': 'error',
      // 'prefer-inline-decorator': 'error',
      // 'template-accessibility-alt-text': 'error',
      // 'template-accessibility-elements-content': 'error',
      // 'template-accessibility-label-for': 'error',
      // 'template-accessibility-table-scope': 'error',
      // 'template-accessibility-valid-aria': 'error',
      // 'template-click-events-have-key-events': 'error',
      // 'template-conditional-complexity': [
      //   'error',
      //   4
      // ],
      // 'template-mouse-events-have-key-events': 'error',
      // 'template-no-distracting-elements': 'error',
      // 'template-use-track-by-function': 'error'
    },
  }, {
    files: ['**/*.js'],

    languageOptions: {
      globals: {},
      ecmaVersion: 2022,
      sourceType: 'script',
    },
  }
]);
