import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { SorterComponent } from './sorter.component';

import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterKind } from '../../enums/sorter-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

import { AppModule } from '../../app.module';

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
    SorterService.SorterKindValues.forEach((sortFieldsKey) =>
      sorterService[SorterKind[sortFieldsKey]] = TestBed.inject(SorterService.InjectionToken(sortFieldsKey,
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
    expect(() => {
      TestingCommon.shouldSimulateMouseClick([component.clickable]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the extra-functions controls', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.clickable]);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        component.sorterService = service;

        let readAll;
        readAll = component.type;
        readAll = component.displayType;
        readAll = component.sorterService;
        readAll = component.entities;
        component.sortFieldsKey = component.sortFieldsKey;
        readAll = component.sortFieldIndex;
        readAll = component.sortOrder;
        readAll = component.sortFieldIndexOrderDirection;
        readAll = component.sortOrderDirection[service.sortOrder];
        readAll = component.nextForward;
        readAll = component.nextBack;
        readAll = component.isInNaturalOrder;
        component.sortFieldIndex = component.sortFieldIndex;
        component.sortOrder = component.sortOrder;

        readAll = SorterService.providers;
      }).not.toThrowError();
    });
  });

  it('should check public interface methods', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        component.sorterService = service;

        let readAll;
        readAll = service.sortField(1);
        readAll = service.sortField(0);
        readAll = service.sortField(-1);
        readAll = component.nextSort(new MouseEvent('click'));
        readAll = component.nextSort(new MouseEvent('click'), true);
        readAll = component.nextSortTitle();
        readAll = component.nextSortTitle(true);
        readAll = component.sorted([]);
        readAll = component.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
      }).not.toThrowError();
    });
  });
});
