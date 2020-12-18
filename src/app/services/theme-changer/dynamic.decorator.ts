/*
  Based on: https://dev.to/angular/decorators-do-not-work-as-you-might-expect-3gmj
  Meant to be used in conjunction with @Input()
*/

export function DynamicPersisted<T>(instanceCallbackName: keyof T, persistenceService: string, defaultValue: string): any {
    // Runs on the property when the container class prototype (not instance!)
    // is first loaded.
    return (target: {}, propertyKey: string | symbol) => {
        // console.log(`@Clamp called on '${String(propertyKey)}' from '${target.constructor.name}'`);

        const key = String();

        // // Create clamp method
        // const clamp = 0;

        // // Create map to store values associated to a class instance
        // const values = new WeakMap();

        // Define property on the target with only a `setter` because we don't
        // want to read from the prototype but instead from the instance.
        // Once the value of the property is set for the first time we define
        // a property with a `getter` and `setter` on the instance.
        Object.defineProperty(target, propertyKey, {
            set(newValue: any) {
                // console.log('set on target');

                // This `setter` gets called once per new instance, and only the
                // first time we set the value of the target property.

                // Here we have access to the instance `this`, so we define
                // a property with the same name on the class instance.
                // tslint:disable-next-line: no-invalid-this
                Object.defineProperty(this, propertyKey, {
                    get() {
                        // console.log('get on instance');
                        // This `getter` gets called every time we read the instance property.
                        // We simply look up the instance in our map and return its value.
                        // tslint:disable-next-line: no-invalid-this
                        // return values.get(this);

                        // tslint:disable-next-line: no-invalid-this
                        // const t = this as any;

                        // tslint:disable-next-line: no-invalid-this
                        return this[persistenceService].getItem(propertyKey) || defaultValue;
                    },
                    // tslint:disable-next-line: no-shadowed-variable
                    set(newValue: any) {
                        // console.log('set on instance');
                        // This `setter` is called every time we set the value of the
                        // property on the class instance.
                        // // tslint:disable-next-line: no-invalid-this
                        // values.set(this, clamp(newValue));

                        // values.set(this, clamp(newValue));

                        // tslint:disable-next-line: no-invalid-this
                        // const t = this as any;

                        // const prevVal = t[key];
                        // const prevValue = this.get();

                        // tslint:disable-next-line: no-invalid-this
                        const prevValue = this[persistenceService].getItem(propertyKey) || defaultValue;

                        // if (prevValue !== newValue) {

                        // t[key] = newVal;
                        // tslint:disable-next-line: no-invalid-this
                        this[persistenceService].setItem(propertyKey, newValue);

                        // tslint:disable-next-line: no-invalid-this
                        this[instanceCallbackName](prevValue, newValue);
                        // }
                    }
                });

                // Finally we set the value of property on the class instance.
                // This will trigger the `setter` on the instance that we defined above.
                // tslint:disable-next-line: no-invalid-this
                return this[propertyKey] = newValue;
            }
        });
    };
}
