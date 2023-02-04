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
/* eslint-disable prefer-arrow/prefer-arrow-functions */

/** Getter factory */
function makeGet(persistenceService: any, propertyKey: string, defaultValue: string) {
    /** Getter closure */
    return function get(): string | null {
        return persistenceService.getItem(propertyKey) || defaultValue;
    };
}

/** Setter factory */
function makeSet(persistenceService: any, propertyKey: string, defaultValue: string) {
    /** Setter closure */
    return function set(value: string) {
        persistenceService.setItem(propertyKey, value || defaultValue);
    };
}

/** Dynamically persisted value property decorator */
// eslint-disable-next-line max-lines-per-function, @typescript-eslint/naming-convention
export const DynamicPersisted = <T extends unknown>(
    instanceCallbackName: keyof T,
    persistenceService: string,
    defaultValueGet: string,
    defaultValueSet: string = defaultValueGet
) => {
    return (target: T, propertyKey: string) => {
        Object.defineProperty(target, propertyKey, {
            get(): string | null {
                const t: any = this;

                Object.defineProperty(t, propertyKey, {
                    get(): string | null {
                        const retVal = makeGet(t[persistenceService], propertyKey, defaultValueGet)();
                        return retVal;
                    },
                    set(value: string) {
                        const prevValue = makeGet(t[persistenceService], propertyKey, defaultValueGet)();
                        makeSet(t[persistenceService], propertyKey, defaultValueSet)(value);
                        t[instanceCallbackName](prevValue, value);
                    }
                });
                return t[propertyKey];
            }
        });
    };
};
