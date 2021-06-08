import { ElementRef, Type } from '@angular/core';
import { FooterProviderComponent } from '../../components/footer-provider/footer-provider.component';

import { Indexable } from '../../interfaces/indexable';

import { Logger } from '../logger/logger';
import { logger } from '../../services/logger/logger.service';

/**
 * Common testing static class.
 * Used at test time only.
 */
export class TestingCommon {
  /** Mock window reload count. */
  public static mockWindowReloadCount = 0;

  /** Chaos test dummy property name. */
  private static readonly chaosTestDummyPropertyName = 'chaosTestDummy';

  /**
   * Check the common lifecycle hooks.
   *
   * @param calee The object whose hooks are to be tested.
   */
  public static checkLifecycleHooks(calee: any) {
    const lifecycleHoooks = ['ngOnInit', 'ngAfterViewInit'] as const;
    lifecycleHoooks.forEach((hook) => {
      if (calee[hook]) { calee[hook](); }
    });
  }

  /**
   * Should simulate mouse click.
   *
   * @param clickables The objects to be tested.
   */
  public static shouldSimulateMouseClick(clickables: (ElementRef | undefined)[] | undefined) {
    clickables?.forEach((_) => {
      const element = _?.nativeElement;
      if (element) {
        if (element?.href) {
          logger.debug(`TestingCommon: shouldSimulateMouseClick: Skipping href: ${element.href}`);
        } else {
          element.click();
        }
      }
    });
  }

  /**
   * Should simulate mouse click using keyboard.
   *
   * @param clickables The objects to be tested.
   */
  public static shouldSimulateMouseClickUsingKeyboard(clickables: (ElementRef | undefined)[] | undefined) {
    clickables?.forEach((_) => {
      if (_?.nativeElement) { _.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' })); }
    });
  }

  /**
   * Should check public interface.
   *
   * @param component The object whose hooks are to be tested.
   */
  public static shouldCheckPublicInterface<T extends FooterProviderComponent>(component: T) {
    let readAll;
    readAll = component.ui;
    readAll = component.entities;
    readAll = component.decorations;
    readAll = component.key;
    readAll = component.expandKey;
    readAll = component.label('');
    readAll = component.uiText('');
  }

  /** Mock window reload. */
  public static mockWindowReload() {
    TestingCommon.mockWindowReloadCount++;
  }

  /** Static constructor. */
  public static staticConstructor() {
    this.disableLogging();
  }

  /** Disable logging. */
  public static disableLogging() {
    logger.doLog = (logKind: (message?: any, ...optionalParams: any[]) => void, message: string) => { };
    logger.mechanism = new Logger();
  }

  /** Enable logging. */
  public static enableLogging() {
    logger.doLog = (logKind: (message?: any, ...optionalParams: any[]) => void, message: string) => {
      logKind(message.replace(new RegExp('%c', 'g'), ''));
    };
    logger.mechanism = console;
  }

  /** Report reloads. */
  public static reportReloads() {
    this.enableLogging();
    logger.log(
      TestingCommon.mockWindowReloadCount > 0
        ? `TestingCommon: reportReloads: Reloaded ${TestingCommon.mockWindowReloadCount} times.`
        : `TestingCommon: reportReloads: No reloading detected.`
    );
    this.disableLogging();
  }

  /** Chaos decorate type. Insert a test dummy property into the object. */
  public static chaosDecorateType<T>(object: Record<string, unknown>) {
    // extend object prototype
    const type: Type<Indexable> = Object;
    type.prototype[this.chaosTestDummyPropertyName] = 1;

    // instantiate extended type
    const instance = new type() as Record<string, unknown> & { chaosTestDummy: number };

    // clone original object properties
    for (const property in object) {
      if (Object.prototype.hasOwnProperty.call(object, property)) {
        instance[property] = object[property];
      }
    }

    return instance;
  }

  /** Chaos undecorate type. Remove the test dummy property from the object. */
  public static chaosUndecorateType<T>(object: Record<string, unknown>) {
    // delete test dummy property inplace
    if (Object.prototype.hasOwnProperty.call(object, this.chaosTestDummyPropertyName)) {
      delete object[this.chaosTestDummyPropertyName];
    }

    // cleanup object prototype
    const type: Type<Indexable> = Object;
    delete type.prototype[this.chaosTestDummyPropertyName];

    return object;
  }
}

/** Construct */
TestingCommon.staticConstructor();

describe('TestingCommon', () => {
  it('should create an instance', () => {
    expect(new TestingCommon()).toBeTruthy();
  });
});
