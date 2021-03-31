import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterKind } from '../../enums/sorter-kind.enum';
import { SortOrder } from '../../enums/sort-order.enum';
import { Go } from '../../enums/go.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

describe('SorterService', () => {
  const sorterService: { [key: string]: SorterService } = {
    Accomplishments: {} as SorterService,
    Publications: {} as SorterService,
    Spectrum: {} as SorterService,
    Projects: {} as SorterService
  };

  let uiService: UiService;
  let persistenceService: PersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    SorterService.SorterKindValues.forEach((sortFieldsKey) => {
      sorterService[SorterKind[sortFieldsKey]] = TestBed.inject(SorterService.InjectionToken(sortFieldsKey,
        uiService = TestBed.inject(UiService),
        persistenceService = TestBed.inject(PersistenceService)
      ));
    });
  });

  it('should be created', () => {
    Object.values(sorterService).forEach((service) => {
      expect(service).toBeTruthy();
    });
  });

  it('should check public interface properties', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        let readAll;
        service.sortFieldsKey = service.sortFieldsKey;
        readAll = service.sortFieldKeyFull;
        readAll = service.sortFieldKeysFull;
        readAll = service.sortFieldKeyIndexFull;
        readAll = service.sortFieldKeyIndexOrderFull;
        readAll = service.sortFieldsDefaults;
        service.sortFieldIndex = service.sortFieldIndex;
        service.sortOrder = service.sortOrder;
        readAll = service.isInNaturalOrder;
        readAll = service.sortOrderDirection[service.sortOrder];
        readAll = service.sortOrderDirection[SortOrder.Ascending];
        readAll = service.sortOrderDirection[SortOrder.Descending];
        readAll = service.sortFieldIndexNextDirection[Go.Forward];
        readAll = service.sortFieldIndexNextDirection[Go.Back];

        readAll = SorterService.SorterKindValues;
        readAll = SorterService.providers;
      }).not.toThrowError();
    });
  });

  it('should check public interface methods', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        let readAll;
        readAll = SorterService.tokenDescription(SorterKind.Accomplishments);
        SorterService.SorterKindValues.forEach((sortFieldsKey) => {
          const deps = [uiService, persistenceService];
          readAll = SorterService.InjectionToken(sortFieldsKey, deps);
          readAll = SorterService.useFactory(sortFieldsKey, deps);
        });
        readAll = service.sortField(1);
        readAll = service.sortField(0);
        readAll = service.sortField(-1);
        readAll = service.nextSort(new MouseEvent('click'));
        readAll = service.nextSort(new MouseEvent('click'), Go.Forward);
        readAll = service.nextSort(new MouseEvent('click'), Go.Back);
        readAll = service.nextSortTitle();
        readAll = service.nextSortTitle(Go.Forward);
        readAll = service.nextSortTitle(Go.Back);
        readAll = service.sorted([]);
        readAll = service.sorted([], service.sortField(service.sortFieldIndex), 2 * service.sortOrder - 1);
        readAll = service.sorted([], service.sortField(service.sortFieldIndex));
      }).not.toThrowError();
    });
  });
});
