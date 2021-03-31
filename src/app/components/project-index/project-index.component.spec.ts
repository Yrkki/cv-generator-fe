import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectIndexComponent } from './project-index.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

import { Project } from '../../interfaces/project/project';

describe('ProjectIndexComponent', () => {
  let component: ProjectIndexComponent;
  let fixture: ComponentFixture<ProjectIndexComponent>;
  let sorterService: SorterService;
  let truncatorService: TruncatorService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        ProjectIndexComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
    sorterService = TestBed.inject(
      SorterService.InjectionToken(SorterKind.Projects,
        TestBed.inject(UiService),
        TestBed.inject(PersistenceService),
      ));
    truncatorService = TestBed.inject(
      TruncatorService.InjectionToken(TruncatorKind.Pp,
        TestBed.inject(PersistenceService),
      ));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.i;
      readAll = component.frequenciesDivider;
      readAll = component.filtered;
      readAll = component.getFrequencyStyle(component.portfolioService.emptyFrequency);
      readAll = component.trackByFn(0, 0);

      ['test project', 'Database applications'].forEach((_) =>
        readAll = component.frequency({ 'Project name': _ } as Project)
      );

      readAll = component.truncatorService.truncated([]);
      readAll = component.truncatorService.remaining([]);
      readAll = component.truncatorService.remainingLength([]);
    }).not.toThrowError();
  });
});
