import { Injectable, Injector, ReflectiveInjector } from '@angular/core';
import { Params } from './../../services/component-outlet-injector/params';

@Injectable()
export class ComponentOutletInjectorService {
  private injector: Injector;
  private injectorCache: Object;
  private initialaized = false;

  init(injector: Injector, injectorCache: Object) {
    this.injector = injector;
    this.injectorCache = injectorCache;
    this.initialaized = true;
  }

  getInjector(propertyName, i?): Injector {
    if (!this.initialaized) {
      console.error('ComponentOutletInjectorService: Not initialized.');
      return undefined;
    }

    const key = JSON.stringify(propertyName).substr(0, 120);
    let injector = this.injectorCache[key];
    if (injector === undefined) {
      // console.log('In Injector: key: ', key);
      injector = ReflectiveInjector.resolveAndCreate([Params], this.injector);
      const params: any = injector.get(Params);
      params.propertyName = propertyName;
      if (i !== undefined) {
        params.i = i;
      }
    }
    this.injectorCache[key] = injector;
    return injector;
  }
}
