export function DynamicPersisted<T>(instanceCallbackName: keyof T, persistenceService: string, defaultValue: string): any {
    return (target: {}, propertyKey: string | symbol) => {
        const key = String();
        Object.defineProperty(target, propertyKey, {
            set(newValue: any) {
                // tslint:disable-next-line: no-invalid-this
                Object.defineProperty(this, propertyKey, {
                    get() {
                        // tslint:disable-next-line: no-invalid-this
                        return this[persistenceService].getItem(propertyKey) || defaultValue;
                    },
                    // tslint:disable-next-line: no-shadowed-variable
                    set(newValue: any) {
                        // tslint:disable-next-line: no-invalid-this
                        const prevValue = this[persistenceService].getItem(propertyKey) || defaultValue;
                        // tslint:disable-next-line: no-invalid-this
                        this[persistenceService].setItem(propertyKey, newValue);
                        // tslint:disable-next-line: no-invalid-this
                        this[instanceCallbackName](prevValue, newValue);
                    }
                });
                // tslint:disable-next-line: no-invalid-this
                return this[propertyKey] = newValue;
            }
        });
    };
}
