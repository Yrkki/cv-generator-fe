import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { AccomplishmentsComponent } from './accomplishments.component';

import { AppModule } from '../../app.module';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

describe('AccomplishmentsComponent', () => {
  let component: AccomplishmentsComponent;
  let fixture: ComponentFixture<AccomplishmentsComponent>;
  let sorterService: SorterService;
  let truncatorService: TruncatorService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AccomplishmentsComponent],
      imports: [
        AppModule
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
    fixture = TestBed.createComponent(AccomplishmentsComponent);
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

  it('should check updateShouldCollapseProjectsAccomplishmentHandler handler', () => {
    expect(() => {
      let readAll;
      readAll = component.updateShouldCollapseProjectsAccomplishmentHandler(new MouseEvent('click'));
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.updateShouldCollapseProjectsAccomplishment('Accomplishments');
      readAll = component.projectsDefined();
      readAll = component.filtered;
      readAll = component.filtered.Accomplishments;

      readAll = component.filtered.Languages;
      readAll = component.filtered.Certifications;
      readAll = component.filtered.Courses;
      readAll = component.filtered.Organizations;
      readAll = component.filtered.Volunteering;
      readAll = component.filtered.Vacation;

      readAll = component.filtered.Projects;
      readAll = component.linkToThisSymbol;
      readAll = component.linkToThisText;
      readAll = component.tabName('');
      readAll = component.trackByFn(0, 0);

      readAll = component.SorterKind;
      readAll = component.CourseIndexComponent;
      readAll = component.CourseListComponent;
      readAll = component.CourseComponent;
      readAll = component.LanguageComponent;
    }).not.toThrowError();
  });
});
