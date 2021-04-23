import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SorterServiceFactory } from './sorter.service.factory';
import { SorterKind } from '../../enums/sorter-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

// eslint-disable-next-line max-lines-per-function
describe('SorterServiceFactory', () => {
  let service: SorterServiceFactory;
  let uiService: UiService;
  let persistenceService: PersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(SorterServiceFactory);
    uiService = TestBed.inject(UiService);
    persistenceService = TestBed.inject(PersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = SorterServiceFactory.SorterKindValues;
      readAll = SorterServiceFactory.providers;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = SorterServiceFactory.tokenDescription(SorterKind.Accomplishments);
      SorterServiceFactory.SorterKindValues.forEach((sorterKind) => {
        const deps = [uiService, persistenceService];
        readAll = SorterServiceFactory.InjectionToken(sorterKind, deps);
        readAll = SorterServiceFactory.useFactory(sorterKind, deps);
      });
    }).not.toThrowError();
  });
});
