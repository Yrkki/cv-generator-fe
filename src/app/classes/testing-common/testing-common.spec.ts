import { ElementRef } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { logger } from '../../services/logger/logger.service';
import { Logger } from '../logger/logger';

describe('TestingCommon', () => {
  it('should create an instance', () => {
    expect(new TestingCommon()).toBeTruthy();
  });
});

/**
 * Common testing static class.
 * Used at test time only.
 */
export class TestingCommon {
  /** Mock window reload count. */
  public static mockWindowReloadCount = 0;

  /**
   * Check the common lifecycle hooks.
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
   * @param clickables The objects to be tested.
   */
  public static shouldSimulateMouseClick(clickables: (ElementRef | undefined)[] | undefined) {
    clickables?.forEach((_) => _?.nativeElement.click());
  }

  /**
   * Should simulate mouse click using keyboard.
   * @param clickables The objects to be tested.
   */
  public static shouldSimulateMouseClickUsingKeyboard(clickables: (ElementRef | undefined)[] | undefined) {
    clickables?.forEach((_) => _?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' })));
  }

  /**
   * Should check public interface.
   * @param component The object whose hooks are to be tested.
   */
  public static shouldCheckPublicInterface<T extends FooterComponent>(component: T) {
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
}

/** Construct */
TestingCommon.staticConstructor();
