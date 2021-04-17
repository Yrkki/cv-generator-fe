import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { TruncatorComponent } from './truncator.component';

import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';

import { AppModule } from '../../app.module';

describe('TruncatorComponent', () => {
  let component: TruncatorComponent;
  let fixture: ComponentFixture<TruncatorComponent>;

  const truncatorService: { [key: string]: TruncatorService } = {
    Cv: {} as TruncatorService,
    Ps: {} as TruncatorService,
    Pp: {} as TruncatorService
  };

  let persistenceService: PersistenceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TruncatorComponent],
      imports: [
        HttpClientTestingModule,
        AppModule,
        FormsModule
      ]
    }).compileComponents();
    TruncatorService.TruncatorKindValues.forEach((truncatorKind) =>
      truncatorService[TruncatorKind[truncatorKind]] = TestBed.inject(TruncatorService.InjectionToken(truncatorKind,
        persistenceService = TestBed.inject(PersistenceService)
      )));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruncatorComponent);
    component = fixture.componentInstance;
    component.truncatorKind = TruncatorKind.Cv;
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
    Object.values(truncatorService).forEach((service) => {
      expect(() => {
        component.truncatorService = service;
        TestingCommon.shouldSimulateMouseClick([
          component.clickableFocusThreshold,
          component.inputFocusThreshold,
          component.tagCloudEmphasisToggle.clickableToggle,
          component.tagCloudEmphasisToggle.inputToggle
        ]);
      }).not.toThrowError();
    });
  });

  it('should simulate mouse click using keyboard', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(() => {
        component.truncatorService = service;
        TestingCommon.shouldSimulateMouseClickUsingKeyboard([
          component.clickableFocusThreshold,
          component.inputFocusThreshold,
          component.tagCloudEmphasisToggle.clickableToggle,
          component.tagCloudEmphasisToggle.inputToggle
        ]);
      }).not.toThrowError();
    });
  });

  it('should check public interface properties', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(() => {
        component.truncatorService = service;

        let readAll;
        component.truncatorKind = component.truncatorKind;
        component.truncatorService = component.truncatorService;

        readAll = component.TruncatorKind;
        readAll = component.longTruncatorKind;

        component.context = component.context;

        readAll = component.ToggleKind;

        readAll = component.tagCloudEmphasisContext;
        readAll = component.tagCloudEmphasisContext.position;
        readAll = component.tagCloudEmphasisContext.value;
        readAll = component.tagCloudEmphasisContext.displayValue;
        readAll = component.tagCloudEmphasisContext.model;
        readAll = component.tagCloudEmphasisContext.subject;
        readAll = component.tagCloudEmphasisContext.propertyName;
        readAll = component.tagCloudEmphasisContext.sliderClass;
      }).not.toThrowError();
    });
  });

  it('should check public interface context dependent properties', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(() => {
        let readAll;
        [component.context, component].forEach((_) => {
          readAll = _?.value;
          readAll = _?.displayValue;
          readAll = _?.model;
          readAll = _?.propertyName;
        });
      }).not.toThrowError();
    });
  });
});
