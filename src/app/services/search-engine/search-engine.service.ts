import { Injectable } from '@angular/core';
import { SearchTokenizerService } from '../search-tokenizer/search-tokenizer.service';
import { forEach } from '@angular/router/src/utils/collection';
import { filter } from 'rxjs/operators';

@Injectable()
export class SearchEngineService {
  private array: any[];
  private searchToken: string;
  private searchExpression: string[][];

  constructor(private searchTokenizerService: SearchTokenizerService) { }

  search(array: any[], searchToken: string): any[] {
    // console.log('search:', array, searchToken);
    if (searchToken.trim().length === 0) { return array; }

    // console.log('search: non-empty:', array, searchToken);
    this.array = array;
    this.searchToken = searchToken;
    this.searchExpression = this.searchTokenizerService.tokenize(searchToken);
    // console.log('search: search expression:', JSON.stringify(this.searchExpression));

    return this.calcFiltered(array);
  }

  private calcFiltered(array: any[]): any[] {
    const o = this.arrayToObject(array);

    let orerO: object = {};
    for (const orOperand of this.searchExpression) {
      // console.log('OR:', JSON.stringify(orOperand));

      let anderO: object = o;
      for (let andOperand of orOperand) {
        // console.log('  AND:', andOperand);

        let filteredO;
        if (andOperand[0] === '-') {
          andOperand = andOperand.substr(1);
          filteredO = this.arrayToObject(this.calcFilteredToken(array, andOperand));
          anderO = this.diffObject(anderO, filteredO);
        } else {
          filteredO = this.arrayToObject(this.calcFilteredToken(array, andOperand));
          anderO = this.intersectObject(anderO, filteredO);
        }

        // console.log('  and:', JSON.stringify(Object.values(anderO).map(_ => Object.values(_)[0])));

        if (Object.keys(anderO).length === 0) { continue; }
      }
      orerO = this.unionObject(orerO, anderO);

      // console.log('or:', JSON.stringify(Object.values(orerO).map(_ => Object.values(_)[0])));

      if (Object.keys(orerO).length === array.length) { continue; }
    }

    return Object.values(orerO);
  }

  private calcFilteredToken(array: any[], searchToken: string): any[] {
    const searchTokenLower = searchToken.trim().toLocaleLowerCase();

    // console.log('Searching for', searchToken, 'in', JSON.stringify(array.map(_ => Object.values(_)[0])), '...');

    // // preprocess request exclusion example
    // const exclude = searchTokenLower[0] === '-';
    // if (exclude) {
    //   searchTokenLower = searchTokenLower.substr(1).trim();
    // }
    // const searcher = exclude ? _ => !_.includes(searchTokenLower) : _ => _.includes(searchTokenLower);
    // const reducer = exclude ? (l, r) => l && r : (l, r) => l || r;

    const searcher = _ => _.includes(searchTokenLower);
    const reducer = (l, r) => l || r;

    return (array)
      .filter(_ => Object.keys(_)
        .map(k => searcher((_[k] || '')
          .toString()
          .toLocaleLowerCase()))
        .reduce(reducer));
  }

  private unionObject(object1: object, object2: object): object {
    // console.log('unionObject:', object1, object2);
    for (const key in object2) {
      if (object2.hasOwnProperty(key)) {
        const element = object2[key];
        if (Object.keys(object1).indexOf(key) === -1) {
          object1[key] = element;
        }
      }
    }
    return object1;
  }

  private intersectObject(object1: object, object2: object): object {
    // console.log('intersectObject:', object1, object2);
    return this.restrictObject(object1, this.intersect(Object.keys(object1), Object.keys(object2)));
  }

  private diffObject(object1: object, object2: object): object {
    // console.log('diffObject:', object1, object2);
    return this.restrictObject(object1, this.diff(Object.keys(object1), Object.keys(object2)));
  }

  // private union(array1: any[], array2: any[]): any[] {
  //   for (const iterator of array2) {
  //     if (array1.indexOf(iterator) === -1) {
  //       array1.push(iterator);
  //     }
  //   }
  //   return array1;
  // }

  private intersect(array1: any[], array2: any[]): any[] {
    // console.log('intersect:', array1, array2);
    return array1.filter(_ => array2.indexOf(_) !== -1);
  }

  private diff(array1: any[], array2: any[]): any[] {
    // console.log('diff:', array1, array2);
    return array1.filter(_ => array2.indexOf(_) === -1);
  }

  private arrayToObject(array: any[]): object {
    // console.log('arrayToObject:', array);
    return array.reduce((previousValue: object, currentValue: object, currentIndex: number) => {
      previousValue[this.hash(currentValue)] = currentValue;
      return previousValue;
    }, {});
  }

  private restrictObject(object, keys) {
    // console.log('restrictObject:', object, keys);
    const result = {};
    for (let i = 0; i < keys.length; i++) {
      result[keys[i]] = object[keys[i]];
    }
    // console.log('restrictObject: returning', result);
    return result;
  }

  private hash(object): string {
    return JSON.stringify(object).substr(0, 200);
  }
}
