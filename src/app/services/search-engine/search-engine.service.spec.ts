import { TestBed } from '@angular/core/testing';

import { SearchEngineService } from './search-engine.service';
import { SearchTokenizerService } from '../search-tokenizer/search-tokenizer.service';

import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

// eslint-disable-next-line max-lines-per-function
describe('SearchEngineService', () => {
  let service: SearchEngineService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchEngineService,
        SearchTokenizerService,
      ]
    });
    service = TestBed.inject(SearchEngineService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // eslint-disable-next-line max-lines-per-function
  it('should test boolean logic', () => {
    const array = [{
      'Countries visited': ['Russia', 'Ukraine', 'Romania', 'Hungary', 'Slovakia', 'Finland', 'Estonia', 'Sweden', 'Norway',
        'Switzerland', 'UK', 'France', 'China', 'Greece', 'Austria', 'Turkey', 'Serbia', 'Macedonia', 'Belgium',
        'Netherlands', 'Germany', 'Czech Republic', 'Spain', 'Cyprus']
    },
    {
      Projects: [{
        Id: 33, 'Project name': 'Database applications', Scope: 'Digital photo archive software',
        Logo: 'Interconsult Bulgaria.png', Country: 'Bulgaria', Industry: 'Imaging', 'Project type': 'Data acquisition',
        'System type': 'Desktop, Digital camera', Platform: 'Windows, MS DOS', Architecture: 'RDBMS, TWAIN',
        'Languages and notations': 'ObjectPAL, Object Pascal', 'IDEs and Tools': 'Borland Paradox for Windows, Borland Delphi',
        'Methodology and practices': 'Waterfall', 'Team size': 3,
        Responsibilities: 'Support and demonstrations, software localization, user interface design', Role: 'Programmer'
      }, {
        Id: 33, 'Project name': 'Database applications', Scope: 'Digital photo archive software',
        Logo: 'Interconsult Bulgaria.png', Country: 'Bulgaria', Industry: 'Imaging', 'Project type': 'Data acquisition',
        'Languages and notations': 'ObjectPAL, Object Pascal', 'IDEs and Tools': 'Borland Paradox for Windows, Borland Delphi',
        'Methodology and practices': 'Waterfall', 'Team size': 3,
        Responsibilities: 'Support and demonstrations, software localization, user interface design', Role: 'Programmer'
      }]
    }];
    expect(service.search(array, 'norway -desktop or austria')).toBeTruthy();
    expect(service.search(array, '-desktop norway or austria')).toBeTruthy();
    expect(service.search(array, 'one and two or three')).toBeTruthy();
    expect(service.search(array, '\'quotes\'')).toBeTruthy();
    expect(service.search(array, '"double quotes"')).toBeTruthy();
    expect(debugService.search(undefined, 'test')).toBeTruthy();
    expect(debugService.search('test', undefined)).toBeTruthy();
    expect(service.search(array, ' ')).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = debugService.keyLength;
      readAll = debugService.notOperator;
      readAll = debugService.searchExpression;
    }).not.toThrowError();
  });

  // eslint-disable-next-line max-lines-per-function
  it('should check public interface methods', () => {
    expect(() => {
      let readAll;

      const o1 = { key1: 'value1', key2: '' };

      // public search<T>(array: T[], SearchToken: string);
      readAll = debugService.calcFiltered([]);
      // readAll = service.calcFilteredOr<T>(arrayObject: Indexable, array: T[], ctx: { orOperand: string[]; orerO: Indexable });
      // readAll = service.calcFilteredAnd<T>(array: T[], ctx: { andOperand: string; anderO: Indexable });

      readAll = debugService.calcFilteredToken([o1], 'test');
      readAll = debugService.calcFilteredToken([o1], 'key1');
      readAll = debugService.calcFilteredToken([o1], 'value1');

      const o2 = TestingCommon.decorateType(o1);
      readAll = debugService.unionObject(o1, o2);

      // readAll = service.intersectObject(object1: Indexable, object2: Indexable);
      // readAll = service.diffObject(object1: Indexable, object2: Indexable);
      // readAll = service.intersect(array1: any[], array2: any[]);
      // readAll = service.diff(array1: any[], array2: any[]);
      // readAll = service.arrayToObject(array: any[]);
      // readAll = service.restrictObject(object: Indexable, keys: string[]);
      // readAll = service.hash(object: Indexable);
    }).not.toThrowError();
  });
});
