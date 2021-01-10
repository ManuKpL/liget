import et from './et';
import { Musician } from './et.mock';

describe('et', () => {
  test('should be defined', () => {
    expect(et).toBeDefined();
  });

  test('should be a function', () => {
    expect(typeof et).toBe('function');
  });

  describe('given a list of class instances', () => {
    let data: Musician[];

    beforeEach(() => {
      data = [new Musician('Jane'), new Musician('Mary')];
    });

    test('when passing a prop name, then should return its value', () => {
      const res = data.map(et('name'));
      expect(res).toStrictEqual(['Jane', 'Mary']);
    });

    describe('when passing a method name', () => {
      test('with no argument, then should invoke the method and return its value', () => {
        const res = data.map(et('ready'));
        expect(res).toStrictEqual(['Yeah!', 'Yeah!']);
      });

      describe('with a single non enumerable argument', () => {
        test('unwrapped, then should invoke the method, pass the argument and return its value', () => {
          const res = data.map(et('greet', 'Myriam'));
          expect(res).toStrictEqual(["Hello Myriam, I'm Jane!", "Hello Myriam, I'm Mary!"]);
        });

        test('wrapped in an array, then should invoke the method, pass the argument and return its value', () => {
          const res = data.map(et('greet', ['Myriam']));
          expect(res).toStrictEqual(["Hello Myriam, I'm Jane!", "Hello Myriam, I'm Mary!"]);
        });
      });

      describe('with a single array-like argument wrapped in an array', () => {
        let styles: string[];
        beforeEach(() => {
          data = data.slice(0, 1);
        });

        test('when empty, then should invoke the method, pass the empty array as arg and return its value', () => {
          styles = [];
          const res = data.map(et('plays', [styles]));
          expect(res).toStrictEqual(['I play all music']);
        });

        test('when has one value, then should invoke the method, pass a single value array as arg and return its value', () => {
          styles = ['Rock'];
          const res = data.map(et('plays', [styles]));
          expect(res).toStrictEqual(['I play Rock music']);
        });

        test('when has several values, then should invoke the method, pass a multi value array as arg and return its value', () => {
          styles = ['Rock', 'Metal', 'Jazz'];
          const res = data.map(et('plays', [styles]));
          expect(res).toStrictEqual(['I play Rock, Metal & Jazz music']);
        });
      });

      describe('with several arguments wrapped in an array', () => {
        beforeEach(() => {
          data = data.slice(0, 1);
        });

        test('including an optional one, then should invoke the method, pass the arguments and return its value', () => {
          const res = data.map(et('introduce', ['Myriam', 23, true]));
          expect(res).toStrictEqual(['This is Myriam, a 23 years old singer']);
        });

        test('excluding the optional one, then should invoke the method, pass the arguments and return its value', () => {
          const res = data.map(et('introduce', ['Myriam', 23]));
          expect(res).toStrictEqual(['This is Myriam, a 23 years old musician']);
        });
      });
    });
  });
});
