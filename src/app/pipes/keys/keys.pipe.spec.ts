import { KeysPipe } from './keys.pipe';

describe('KeysPipe', () => {
  it('should be created', () => {
    const pipe = new KeysPipe();
    expect(pipe).toBeTruthy();
  });

  it('should be able to transform', () => {
    const pipe = new KeysPipe();
    expect(pipe.transform({ a: 'aa', b: 'bb' })).toEqual(['a', 'b']);
  });
});
