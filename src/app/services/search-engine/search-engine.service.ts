import { Injectable } from '@angular/core';
import { SearchTokenizerService } from '../search-tokenizer/search-tokenizer.service';

/** Type decorator */
@Injectable()
/**
 * Search engine service.
 */
export class SearchEngineService {
  /** Lenght of the hash key in characters.
   *
   * Data-dependent. Should be large enough to guarantee uniqueness.
   * */
  private readonly keyLength = 200;

  /** The negation prefixed operator */
  private readonly notOperator = '-';

  /**
   * The tokenized search expression in disjunctive normal form, as a sum of products.
   * @description
   * An array of OR'd AND'd tokens, some of then possibly negated.
   * */
  private searchExpression: string[][];

  /**
   * Constructs the search engine.
   * @param searchTokenizerService The search tokenizer service used for tokenizing the initial search token.
   */
  constructor(private searchTokenizerService: SearchTokenizerService) { }

  /**
   * Filter an array based on element compliance with a search query string (expression) abiding by the internal operators and order.
   * @param array The data array to search.
   * @param searchToken The search query string (expression).
   *
   * @returns The filtered array.
   */
  search(array: any[], searchToken: string): any[] {
    // console.log('search:', array, searchToken);
    if (searchToken.trim().length === 0) { return array; }

    // console.log('search: non-empty:', array, searchToken);
    this.searchExpression = this.searchTokenizerService.tokenize(searchToken);
    // console.log('search: search expression:', JSON.stringify(this.searchExpression));

    const rerVal = this.calcFiltered(array);
    // console.log('search: returning:', rerVal);

    return rerVal;
  }

  /**
   * Filter an array based on the calulated tokenized search expression.
   * @param array The data array to search.
   *
   * @returns The filtered array.
   */
  private calcFiltered(array: any[]): any[] {
    const o = this.arrayToObject(array);

    let orerO: object = {};
    for (const orOperand of this.searchExpression) {
      // console.log('OR:', JSON.stringify(orOperand));

      let anderO: object = o;
      for (let andOperand of orOperand) {
        // console.log('  AND:', andOperand);

        let filteredO;
        let calcSetOperation;
        if (andOperand[0] === this.notOperator) {
          andOperand = andOperand.substr(1);
          calcSetOperation = (o1, o2) => this.diffObject(o1, o2);
        } else {
          calcSetOperation = (o1, o2) => this.intersectObject(o1, o2);
        }

        filteredO = this.arrayToObject(this.calcFilteredToken(array, andOperand));
        anderO = calcSetOperation(anderO, filteredO);

        // console.log('  and:', JSON.stringify(Object.values(anderO).map(_ => Object.values(_)[0])));

        if (Object.keys(anderO).length === 0) { continue; }
      }
      orerO = this.unionObject(orerO, anderO);

      // console.log('or:', JSON.stringify(Object.values(orerO).map(_ => Object.values(_)[0])));

      if (Object.keys(orerO).length === array.length) { continue; }
    }

    return Object.values(orerO);
  }

  /**
   * Filter an array based on element compliance with a search item.
   * @param array The data array to search.
   * @param searchToken The search item.
   *
   * @returns The filtered array.
   */
  private calcFilteredToken(array: any[], searchToken: string): any[] {
    const searchTokenLower = searchToken.trim().toLocaleLowerCase();

    // console.log('calcFilteredToken: Searching for', searchToken, 'in', JSON.stringify(array.map(_ => Object.values(_)[0])), '...');

    // // preprocess request exclusion example
    // const exclude = searchTokenLower[0] === this.notOperator;
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

  /**
   * Calculates the union of two objects as a set union of the sets of their properties.
   * @param object1 The first object.
   * @param object2 The second object.
   *
   * @returns The union of the two objects.
   */
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

  /**
   * Calculates the intersection of two objects as a set intersection of the sets of their properties.
   * @param object1 The first object.
   * @param object2 The second object.
   *
   * @returns The intersection of the two objects.
   */
  private intersectObject(object1: object, object2: object): object {
    // console.log('intersectObject:', object1, object2);
    return this.restrictObject(object1, this.intersect(Object.keys(object1), Object.keys(object2)));
  }

  /**
   * Calculates the difference of two objects as a set difference of the sets of their properties.
   * @param object1 The first object.
   * @param object2 The second object.
   *
   * @returns The difference of the two objects (the first minus the second).
   */
  private diffObject(object1: object, object2: object): object {
    // console.log('diffObject:', object1, object2);
    return this.restrictObject(object1, this.diff(Object.keys(object1), Object.keys(object2)));
  }

  // /**
  //  * Calculates the union of two arrays as a set union of their elements.
  //  * @param array1 The first array.
  //  * @param array2 The second array.
  //  *
  //  * @returns The union of the two arrays.
  //  */
  // private union(array1: any[], array2: any[]): any[] {
  //   for (const iterator of array2) {
  //     if (array1.indexOf(iterator) === -1) {
  //       array1.push(iterator);
  //     }
  //   }
  //   return array1;
  // }

  /**
   * Calculates the intersection of two arrays as a set intersection of their elements.
   * @param array1 The first array.
   * @param array2 The second array.
   *
   * @returns The intersection of the two arrays.
   */
  private intersect(array1: any[], array2: any[]): any[] {
    // console.log('intersect:', array1, array2);
    return array1.filter(_ => array2.indexOf(_) !== -1);
  }

  /**
   * Calculates the difference of two arrays as a set difference of their elements.
   * @param array1 The first array.
   * @param array2 The second array.
   *
   * @returns The difference of the two arrays (the first minus the second).
   */
  private diff(array1: any[], array2: any[]): any[] {
    // console.log('diff:', array1, array2);
    return array1.filter(_ => array2.indexOf(_) === -1);
  }

  /**
   * Convert an array of objects into an object with a property for each element of the original array.
   * @param array  The data array to convert.
   *
   * @description
   * Each property is a key-value pair with a hash calculated from the element object for a key and the element object itself for a value.
   *
   * @returns The array converted into an object.
   */
  private arrayToObject(array: any[]): object {
    // console.log('arrayToObject:', array);
    return array.reduce((previousValue: object, currentValue: object, currentIndex: number) => {
      previousValue[this.hash(currentValue)] = currentValue;
      return previousValue;
    }, {});
  }

  /**
   * Projects an object to an object containing only a selection of the original one's properties.
   * @param object The object whose properties to restrict.
   * @param keys The set of keys to include in the new object.
   *
   * @returns The restricted (projected) object.
   */
  private restrictObject(object: object, keys: string[]) {
    // console.log('restrictObject:', object, keys);
    const result = {};
    for (let i = 0; i < keys.length; i++) {
      result[keys[i]] = object[keys[i]];
    }
    // console.log('restrictObject: returning', result);
    return result;
  }

  /**
   * Calculates a unique hash form an object.
   * @param object The object to calculate a hash from.
   *
   * @returns The hash calculated.
   */
  private hash(object: object): string {
    return JSON.stringify(object).substr(0, this.keyLength);
  }
}
