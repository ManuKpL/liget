import { neo } from '@src/neo';
import { Musician } from './Musician';

describe('neo()', () => {
  test('should be defined', () => {
    expect(neo).toBeDefined();
  });

  test('should be a function', () => {
    expect(typeof neo).toBe('function');
  });

  test('given a constructor function taking a single param, then should return new instances', () => {
    const data = ['Jane', 'Mary'];
    expect.assertions(data.length * 2);

    const res = data.map(neo(Musician));

    res.forEach((element, index) => {
      expect(element).toBeInstanceOf(Musician);
      expect(element.name).toBe(data[index]);
    });
  });
});
