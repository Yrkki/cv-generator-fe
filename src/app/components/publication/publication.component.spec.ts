import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { PublicationComponent } from './publication.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

describe('PublicationComponent', () => {
  let component: PublicationComponent;
  let fixture: ComponentFixture<PublicationComponent>;
  let sorterService: SorterService;
  let truncatorService: TruncatorService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        PublicationComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
    sorterService = TestBed.inject(
      SorterService.InjectionToken(SorterKind.Accomplishments,
        TestBed.inject(UiService),
        TestBed.inject(PersistenceService),
      ));
    truncatorService = TestBed.inject(
      TruncatorService.InjectionToken(TruncatorKind.Cv,
        TestBed.inject(PersistenceService),
      ));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => { component.Initialize(); }).not.toThrowError();
  });

  it('should simulate mouse click', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClick(component.headerComponents?.map((_) => _.clickable));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard(component.headerComponents?.map((_) => _.clickable));
    }).not.toThrowError();
  });

  it('should check entities', () => { expect(() => { const readAll = component.entities; }).not.toThrowError(); });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check saveToggle event handler', () => {
    expect(() => {
      let readAll;
      readAll = component.saveToggle(new MouseEvent('click'));
      readAll = component.saveToggle(new MouseEvent('click', { ctrlKey: true } ));
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.entities;
      readAll = component.filtered;
      readAll = component.linkToThisSymbol;
      readAll = component.linkToThisText;
      readAll = component.tabName('');
      readAll = component.trackByFn(0, 0);

      readAll = component.truncatorService.truncated([]);
      readAll = component.truncatorService.remaining([]);
      readAll = component.truncatorService.remainingLength([]);

      readAll = component.SorterKind;
      readAll = component.PublicationIndexComponent;
      readAll = component.PublicationListComponent;
    }).not.toThrowError();
  });
});
