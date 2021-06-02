import { EventEmitter, Injectable } from '@angular/core';

import { Context } from '../../interfaces/context/context';
import { ContextConfiguration } from '../../interfaces/context/context-configuration';
import { NavState } from '../../enums/nav-state';
import { PersistenceService } from '../persistence/persistence.service';
import { UiService } from '../ui/ui.service';
import { StringExService } from '../string-ex/string-ex.service';

/**
 * Context service.
 */
@Injectable({
  providedIn: 'root'
})
export class ContextService {
  /** Persistence key. */
  private get persistenceKey() {
    return {
      contexts: 'contexts',
      selectedContext: 'selectedContext',
    };
  }

  /* Contexts. */
  #contexts?: Context[];
  /* Contexts getter. */
  public get contexts() {
    // cache the get's
    if (this.#contexts) { return this.#contexts; }

    // retrieve the value
    const value = JSON.parse(this.persistenceService.getItem(this.persistenceKey.contexts) ?? JSON.stringify([this.emptyContext]));

    // cache the value retrieved
    this.#contexts = value;

    // return the value
    return value;
  }
  /* Contexts setter. */
  public set contexts(value: Context[]) {
    // cache the value to store
    this.#contexts = value;

    // store the value
    if (value) {
      this.persistenceService.setItem(this.persistenceKey.contexts, JSON.stringify(value));
    }
  }

  /** Empty context. */
  private readonly emptyContext = { id: 0, name: '', storage: {} as Storage };

  /** Selected context getter. */
  public get selectedContext() {
    // return JSON.parse(this.persistenceService.getItem(this.persistenceKey.selectedContext) ?? JSON.stringify(this.emptyContext));

    // serialize as id
    const selectedContext = this.persistenceService.getItem(this.persistenceKey.selectedContext);
    if (!selectedContext) { return undefined; }
    const selectedContextId = Number.parseInt(selectedContext, 10);
    const context = this.contexts.find((_) => _.id === selectedContextId);
    return context;

    // // serialize as context
    // let selectedContextString = this.persistenceService.getItem(this.persistenceKey.selectedContext);
    // let newContext;
    // if (!selectedContextString) {
    //   newContext = this.newContext;
    //   selectedContextString = JSON.stringify(newContext);
    //   this.selectedContext = newContext;
    // }
    // return newContext ?? JSON.parse(selectedContextString);
  }
  /** Selected context setter. */
  public set selectedContext(value: Context | undefined) {
    // save context
    this.copyStorage(this.persistenceService.storage.storage, this.selectedContext?.storage);

    // serialize as id
    if (typeof value === 'undefined') {
      this.persistenceService.removeItem(this.persistenceKey.selectedContext);
    } else {
      this.persistenceService.setItem(this.persistenceKey.selectedContext, value.id.toString());
    }

    // persist contexts
    this.contexts = this.contexts;
    // this.persistenceService.setItem(this.persistenceKey.contexts, JSON.stringify(this.contexts));

    // retrieve context
    this.copyStorage(value?.storage, this.persistenceService.storage.storage);
  }

  /** Whether context switcher is in editing mode. */
  public isEditing = false;

  /** Nav state "context state" persistence key. */
  public readonly navStatePersistenceKey = 'navState';

  /** Nav state getter. */
  public get navState() {
    return Number.parseInt(this.persistenceService.getItem(this.navStatePersistenceKey) ?? NavState.Closed.toString(), 10);
  }
  /** Nav state setter. */
  public set navState(value) {
    this.persistenceService.setItem(this.navStatePersistenceKey, value.toString());

    // emit change event
    const navStateConfiguration = this.navStateConfigurations[this.navState];
    this.navStateChanged$.emit(navStateConfiguration);
  }
  /** Nav state changed event emitter. */
  public readonly navStateChanged$ = new EventEmitter<ContextConfiguration>();

  /** Nav state configurations */
  public get navStateConfigurations(): ContextConfiguration[] {
    return [
      { width: '10px', backgroundColor: 'rgba(0,0,0,0)', name: () => '' },
      { width: '350px', backgroundColor: 'rgba(0,0,0,0.2)', name: (item: Context) => item.name },
      { width: '100px', backgroundColor: 'rgba(0,0,0,0.1)', name: (item: Context) => StringExService.glyph(item.name) },
    ];
  }

  /**
   * Constructs the entities service.
   * ~constructor
   *
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public readonly uiService: UiService,
    public readonly persistenceService: PersistenceService,
  ) {
  }

  /** Context comparer. */
  public contextEquals(context1?: Context, context2?: Context) {
    return context1?.id === context2?.id;
  }

  /** Copy relevant storage between switcher and persistence */
  private copyStorage(source?: Storage, destination?: Storage) {
    if (typeof source !== 'undefined') {
      const { contexts, selectedContext, navState, ...serializabeStorage } = source;
      // serializabeStorage.contexts = this.contexts;

      if (typeof destination !== 'undefined') {
        Object.entries(serializabeStorage).forEach((entry) => {
          destination[entry[0]] = entry[1];
          // this.persistenceService.storage.storage[key] = this.persistenceService.storage.getItem(key);
        });
      }
    }
  }

  /** Get context caption */
  public getCaption(item: Context) {
    const name = this.navStateConfigurations[this.navState].name(item) || '‣';
    return this.contextEquals(item, this.selectedContext) ? name.toUpperCase() : name;
  }

  /** Get context tooltip title */
  public getTitle(item: Context) {
    let title = '';
    if (!this.isEditing) {
      title += this.navStateConfigurations[NavState.Open].name(item);
      if (this.navState === NavState.Open) {
        title += '\n\n' + this.uiService.uiText('Click to edit.');
      }
    }
    return title;
  }
}
