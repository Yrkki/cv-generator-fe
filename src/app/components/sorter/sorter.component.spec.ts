import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { SorterComponent } from './sorter.component';

import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterKind } from '../../enums/sorter-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
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

  let portfolioService: PortfolioService;
  let entitiesService: EntitiesService;
  let inputService: InputService;
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
    SorterService.SorterKindValues.forEach(sortFieldsKey =>
      sorterService[SorterKind[sortFieldsKey]] = TestBed.inject(SorterService.InjectionToken(sortFieldsKey,
        portfolioService = TestBed.inject(PortfolioService),
        entitiesService = TestBed.inject(EntitiesService),
        inputService = TestBed.inject(InputService),
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

  it('should check public interface', () => {
    Object.values(sorterService).forEach(service => {
      expect(() => {
        component.sorterService = service;

        let readAll;
        readAll = component.type;
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
        readAll = service.sortField(1);
        readAll = service.sortField(0);
        readAll = service.sortField(-1);
        readAll = component.nextSort(new MouseEvent('click'));
        readAll = component.nextSort(new MouseEvent('click'), true);
        readAll = component.nextSortTitle();
        readAll = component.nextSortTitle(true);
        readAll = component.truncated([]);
        readAll = component.sorted([]);
        readAll = component.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
      }).not.toThrowError();
    });
  });
});
