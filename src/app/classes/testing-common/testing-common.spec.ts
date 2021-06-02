import { ElementRef, Type } from '@angular/core';
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

  /** Mock data. */
  public static readonly mockData = {
    frequencies: [
      [
        'Developer',
        {
          Count: 16,
          Percentage: 48,
          Lightness: 0,
          Label: 'Developer'
        }
      ],
      [
        'Programmer',
        {
          Count: 5,
          Percentage: 15,
          Lightness: 37,
          Label: 'Programmer'
        }
      ]
    ],
    languages: [
      {
        Language: 'English',
        Level: 'Full professional proficiency',
        Score: 4,
        Share: 30,
        Label: 'English'
      }
    ],
    projects: [
      {
        Id: 1,
        From: 43243,
        To: 61543,
        'From Year': 2018,
        'From Month': 5,
        'Imported Name': 'Pluralsight Skill IQ in partnership with Stack Overflow',
        'Months total': 601,
        'Duration total': '601',
        Name: 'Pluralsight Skill IQ in partnership with Stack Overflow',
        Start: 2018.4166666666667,
        'Years total': 50.083333333333336,
        Type: 'Certification',
        Color: '#7F00FFC0'
      },
      {
        Id: 1,
        From: 43221,
        To: 43252,
        'From Year': 2018,
        'From Month': 5,
        'Imported Name': 'Life Store (freelance)',
        'Months total': 1,
        'Duration total': '1 month',
        Name: 'Life Store (freelance)',
        Start: 2018.4166666666667,
        'Years total': 0.08333333333333333,
        Type: 'Project',
        Color: '#004000C0'
      }
    ],
    filteredProjects: [
      {
        Id: 1,
        From: 43221,
        To: 43252,
        'From Year': 2018,
        'From Month': 5,
        'Imported Name': 'Life Store (freelance)',
        'Months total': 1,
        'Duration total': '1 month',
        Name: 'Life Store (freelance)',
        Start: 2018.4166666666667,
        'Years total': 0.08333333333333333,
        Type: 'Project',
        Color: '#004000C0'
      }
    ]
  };

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

  /** Add chart arguments. */
  // eslint-disable-next-line max-lines-per-function
  public static addChartArguments(): [items: any, filteredItems: any] {
    return [this.mockData.projects, this.mockData.filteredProjects];
  }

  /** Decorate type. */
  public static decorateType<T>(object: Record<string, unknown>) {
    const type: Type<{ [index: string]: any; }> = Object;
    type.prototype.testDummy = 1;
    const instance = new type() as Record<string, unknown> & { testDummy: number };
    for (const component in object) {
      if (Object.prototype.hasOwnProperty.call(object, component)) {
        instance[component] = object[component];
      }
    }
    return instance;
  }
}

/** Construct */
TestingCommon.staticConstructor();
