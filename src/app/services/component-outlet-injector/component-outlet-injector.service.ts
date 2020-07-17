import { Injectable, Injector } from '@angular/core';
import { Params } from './../../services/component-outlet-injector/params';
import { Indexable } from '../..//interfaces/indexable';

/**
 * The injector service for use with component outles.
 */
@Injectable({
  providedIn: 'root'
})
export class ComponentOutletInjectorService {
  /** Lenght of the injector cache key in characters.
   *
   * Data-dependent. Should be large enough to guarantee uniqueness within the cache.
   */
  private readonly keyLength = 120;

  /** The injector. */
  private injector?: Injector;
  /** The injector cache. */
  private injectorCache: Indexable = {};
  /** Whether initialized. */
  private initialaized = false;

  /**
   * Class initializer.
   * @param injector The injector passed.
   * @param injectorCache The injector cache to maintain by the service.
   */
  init(injector: Injector, injectorCache: Indexable) {
    this.injector = injector;
    this.injectorCache = injectorCache;
    this.initialaized = true;
  }

  /**
   * Injector getter.
   * @param propertyName The parameter index.
   * @param i The sequential index when requested.
   *
   * @returns An injector from the cache.
   */
  getInjector(propertyName: Indexable, i?: number): Injector {
    if (!this.initialaized) {
      console.error('ComponentOutletInjectorService: Not initialized.');
      // return undefined;
    }

    const key = JSON.stringify(propertyName).substr(0, this.keyLength);
    let injector = this.injectorCache[key];
    if (injector === undefined) {
      // console.log('Debug: In Injector: key: ', key);
      injector = Injector.create({ providers: [{ provide: Params, deps: [] }], parent: this.injector });
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
