import { TestBed, inject } from '@angular/core/testing';

import { SearchEngineService } from './search-engine.service';
import { SearchTokenizerService } from '../search-tokenizer/search-tokenizer.service';

// eslint-disable-next-line max-lines-per-function
describe('SearchEngineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchEngineService, SearchTokenizerService]
    });
  });

  it('should be created', inject([SearchEngineService], (service: SearchEngineService) => {
    expect(service).toBeTruthy();
  }));

  // eslint-disable-next-line max-lines-per-function
  it('should test boolean logic', inject([SearchEngineService], (service: SearchEngineService) => {
    const array = [{
      'Countries visited': ['Russia', 'Ukraine', 'Romania', 'Hungary', 'Slovakia', 'Finland', 'Estonia', 'Sweden', 'Norway',
        'Switzerland', 'UK', 'France', 'China', 'Greece', 'Austria', 'Turkey', 'Serbia', 'Macedonia', 'Belgium',
        'Netherlands', 'Germany', 'Czech Republic', 'Spain', 'Cyprus']
    },
    {
      'Projects': [{
        'Id': 33, 'Project name': 'Database applications', 'Scope': 'Digital photo archive software',
        'Logo': 'Interconsult Bulgaria.png', 'Country': 'Bulgaria', 'Industry': 'Imaging', 'Project type': 'Data acquisition',
        'System type': 'Desktop, Digital camera', 'Platform': 'Windows, MS DOS', 'Architecture': 'RDBMS, TWAIN',
        'Languages and notations': 'ObjectPAL, Object Pascal', 'IDEs and Tools': 'Borland Paradox for Windows, Borland Delphi',
        'Methodology and practices': 'Waterfall', 'Team size': 3,
        'Responsibilities': 'Support and demonstrations, software localization, user interface design', 'Role': 'Programmer'
      }, {
        'Id': 33, 'Project name': 'Database applications', 'Scope': 'Digital photo archive software',
        'Logo': 'Interconsult Bulgaria.png', 'Country': 'Bulgaria', 'Industry': 'Imaging', 'Project type': 'Data acquisition',
        'Languages and notations': 'ObjectPAL, Object Pascal', 'IDEs and Tools': 'Borland Paradox for Windows, Borland Delphi',
        'Methodology and practices': 'Waterfall', 'Team size': 3,
        'Responsibilities': 'Support and demonstrations, software localization, user interface design', 'Role': 'Programmer'
      }]
    }];
    expect(service.search(array, 'norway -desktop or austria')).toBeTruthy();
    expect(service.search(array, '-desktop norway or austria')).toBeTruthy();
    expect(service.search(array, ' ')).toBeTruthy();
  }));
});
