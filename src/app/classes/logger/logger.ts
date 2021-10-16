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
import { ILogger } from '../../interfaces/logger/logger';

/**
 * Logger class.
 * ~implements {@link ILogger}
 */
export class Logger implements ILogger {
  /** Log */
  public log(message?: any, ...optionalParams: any[]) { }

  /** Info */
  public info(message?: any, ...optionalParams: any[]) { }

  /** Debug */
  public debug(message?: any, ...optionalParams: any[]) { }

  /** Warn */
  public warn(message?: any, ...optionalParams: any[]) { }

  /** Error */
  public error(message?: any, ...optionalParams: any[]) { }
}
