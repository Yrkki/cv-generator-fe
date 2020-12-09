import { TestBed, inject } from '@angular/core/testing';

import { StringExService } from './string-ex.service';

describe('StringExService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StringExService]
    });
  });

  it('should be created', inject([StringExService], (service: StringExService) => {
    expect(service).toBeTruthy();
  }));

  it('should replace all properly', () => {
    expect(StringExService.replaceAll('abcabcabc', 'b', 'D')).toEqual('aDcaDcaDc');
  });

  it('should capitalize properly', () => {
    expect(StringExService.capitalize('a')).toEqual('A');
  });

  it('should convert to title case properly', () => {
    expect(StringExService.toTitleCase('abc def')).toEqual('Abc Def');
  });

  it('should convert to snake case properly', () => {
    expect(StringExService.snakeCase('abc def')).toEqual('abc_def');
  });

  it('should shorten properly', () => {
    expect(StringExService.shorten('123456789 123456789 123456789 123456789 123456789 123456789 ')).toEqual('123456789 123456789 123456789 123456789 123456789 ...');
  });

  it('should split line properly', () => {
    expect(StringExService.splitLine('123456789 123456789 123456789 123456789 123456789 123456789 ')).toEqual(['123456789 123456789 123456789 123456789 123456789', '123456789 ']);
    expect(StringExService.splitLine(['123456789 123456789 123456789 123456789 123456789 123456789 ', '123456789 123456789 123456789 123456789 123456789 123456789 ']))
      .toEqual(['123456789 123456789 123456789 123456789 123456789', '123456789  - 123456789 123456789 123456789', '123456789 123456789 123456789 ']);
  });
});
