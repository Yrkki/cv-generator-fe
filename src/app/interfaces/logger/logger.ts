// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
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
/**
 * Logger interface.
 */
export interface ILogger {
  /** Mechanism */
  mechanism?: ILogger;

  /** Log */
  log(message?: any, ...optionalParams: any[]): void;

  /** Info */
  info(message?: any, ...optionalParams: any[]): void;

  /** Debug */
  debug(message?: any, ...optionalParams: any[]): void;

  /** Warn */
  warn(message?: any, ...optionalParams: any[]): void;

  /** Error */
  error(message?: any, ...optionalParams: any[]): void;
}
