import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { SorterComponent } from './sorter.component';
import { Go } from '../../enums/go.enum';

import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { SorterKind } from '../../enums/sorter-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

import { AppModule } from '../../app.module';

// eslint-disable-next-line max-lines-per-function
describe('SorterComponent', () => {
  let component: SorterComponent;
  let fixture: ComponentFixture<SorterComponent>;

  const sorterService: { [key: string]: SorterService } = {
    Accomplishments: {} as SorterService,
    Publications: {} as SorterService,
    Spectrum: {} as SorterService,
    Projects: {} as SorterService
  };

  let uiService: UiService;
  let persistenceService: PersistenceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SorterComponent],
      imports: [
        HttpClientTestingModule,
        AppModule,
        FormsModule
      ]
    }).compileComponents();
    SorterServiceFactory.SorterKindValues.forEach((sorterKind) =>
      sorterService[SorterKind[sorterKind]] = TestBed.inject(SorterServiceFactory.InjectionToken(sorterKind,
        uiService = TestBed.inject(UiService),
        persistenceService = TestBed.inject(PersistenceService)
      )));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => { component.Initialize(); }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should simulate mouse click', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        fixture.debugElement.componentInstance.truncatorService = service;
        TestingCommon.shouldSimulateMouseClick([component.clickableBack, component.clickableForward, component.clickableHome]);
      }).not.toThrowError();
    });
  });

  it('should simulate mouse click using keyboard', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        fixture.debugElement.componentInstance.truncatorService = service;
        TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.clickableBack, component.clickableForward, component.clickableHome]);
      }).not.toThrowError();
    });
  });

  it('should check public interface properties', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        fixture.debugElement.componentInstance.sorterService = service;

        let readAll;
        readAll = component.type;
        readAll = component.displayType;
        readAll = component.subSortField.sorterService;
        component.sorterKind = component.sorterKind;
        readAll = component.subSortField.sortFieldIndex;
        readAll = component.subSortField.sortOrder;
        readAll = component.subSortField.orderDirection;
        readAll = component.subSortField.orderDirection[service.sortOrder];
        readAll = component.subSortField.nextHome;
        readAll = component.subSortField.nextBack;
        readAll = component.subSortField.nextForward;
        readAll = component.subSortField.isInNaturalOrder;
        component.subSortField.sortFieldIndex = component.subSortField.sortFieldIndex;
        component.subSortField.sortOrder = component.subSortField.sortOrder;
      }).not.toThrowError();
    });
  });

  it('should check public interface methods', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        fixture.debugElement.componentInstance.sorterService = service;

        let readAll;
        readAll = service.sortField(1);
        readAll = service.sortField(0);
        readAll = service.sortField(-1);
        [undefined, Go.Home, Go.Back, Go.Forward].forEach((_) => {
          readAll = component.subSortField.nextSort(new MouseEvent('click'), _);
          readAll = component.subSortField.nextSortTitle(_);
        });
        readAll = component.subSortField.sorted([]);
      }).not.toThrowError();
    });
  });
});
