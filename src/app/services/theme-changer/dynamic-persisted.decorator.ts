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
// eslint-disable-next-line max-lines-per-function
export function DynamicPersisted<T>(
    instanceCallbackName: keyof T,
    persistenceService: string,
    defaultValueGet: string,
    defaultValueSet: string = defaultValueGet
): any {
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

                if (t.hasOwnProperty('propertyKey')) {
                    t[propertyKey] = newValue;
                }
            }
        });
    };
}
