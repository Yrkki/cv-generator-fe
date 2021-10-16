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
/* eslint-disable prefer-arrow/prefer-arrow-functions */

/** Getter factory */
function makeGet(persistenceService: any, propertyKey: string, defaultValue: string) {
    /** Getter closure */
    return function get() {
        return persistenceService.getItem(propertyKey) || defaultValue;
    };
}

/** Setter factory */
function makeSet(persistenceService: any, propertyKey: string, defaultValue: string) {
    /** Setter closure */
    return function set(newValue: any) {
        persistenceService.setItem(propertyKey, newValue || defaultValue);
    };
}

/** Dynamically persisted value property decorator */
// eslint-disable-next-line max-lines-per-function, @typescript-eslint/naming-convention
export const DynamicPersisted = <T extends unknown>(
    instanceCallbackName: keyof T,
    persistenceService: string,
    defaultValueGet: string,
    defaultValueSet: string = defaultValueGet
): any => {
    // eslint-disable-next-line max-lines-per-function
    return (target: Record<string, unknown>, propertyKey: string) => {
        Object.defineProperty(target, propertyKey, {
            get() {
                // console.log(`class get: target: ${JSON.stringify(target)}, propertyKey: ${propertyKey}`);

                // eslint-disable-next-line no-invalid-this
                // tslint:disable-next-line: no-invalid-this
                const t = this;

                Object.defineProperty(t, propertyKey, {
                    get() {
                        const retVal = makeGet(t[persistenceService], propertyKey, defaultValueGet)();
                        // console.log(`   instance get: propertyKey: ${propertyKey}, retVal: ${retVal}`);
                        return retVal;
                    },
                    set(newValue: any) {
                        // console.log(`   instance set: propertyKey: ${propertyKey}, newValue: ${newValue}`);
                        const prevValue = makeGet(t[persistenceService], propertyKey, defaultValueGet)();
                        makeSet(t[persistenceService], propertyKey, defaultValueSet)(newValue);
                        t[instanceCallbackName](prevValue, newValue);
                    }
                });
                // console.log(`class get: trigger instance getter: propertyKey: ${propertyKey}, t[propertyKey]: ${t[propertyKey]}}`);
                return t[propertyKey];
            },
            set(newValue: any) {
                // eslint-disable-next-line no-invalid-this
                // tslint:disable-next-line: no-invalid-this
                const t = this;

                if (Object.prototype.hasOwnProperty.call(t, 'propertyKey')) {
                    t[propertyKey] = newValue;
                }
            }
        });
    };
};
