import nea from './nea';

describe('nea()', () => {
  test('should be defined', () => {
    expect(nea).toBeDefined();
  });

  test('should be a function', () => {
    expect(typeof nea).toBe('function');
  });

  describe('given a constructor function taking a single param', () => {
    test('string, when wrapped in an array, then should return new instances', () => {
      class User {
        public constructor(public name: string) {}
      }

      const data: [string][] = [['Jane'], ['Mary']];
      expect.assertions(data.length * 2);

      const res = data.map(nea(User));

      res.forEach((element, index) => {
        expect(element).toBeInstanceOf(User);
        expect(element.name).toBe(data[index][0]);
      });
    });

    test('object, when wrapped in an array, then should return new instances', () => {
      interface UserJson {
        name: string;
        login: string;
      }

      class User {
        public name: string;
        public login: string;

        public constructor({ name, login }: UserJson) {
          this.name = name;
          this.login = login;
        }
      }

      const data: [UserJson][] = [
        [{ name: 'Ada Lovelace', login: 'a.lovelace' }],
        [{ name: 'Margaret Hamilton', login: 'm.hamilton' }],
      ];

      expect.assertions(data.length * 3);

      const res = data.map(nea(User));

      res.forEach((element, index) => {
        expect(element).toBeInstanceOf(User);
        expect(element.name).toBe(data[index][0].name);
        expect(element.login).toBe(data[index][0].login);
      });
    });

    test('array, when wrapped in an array, then should return new instances', () => {
      type UserEntry = [string, string];

      class User {
        public name: string;
        public login: string;

        public constructor([name, login]: UserEntry) {
          this.name = name;
          this.login = login;
        }
      }

      const data: [UserEntry][] = [[['Ada Lovelace', 'a.lovelace']], [['Margaret Hamilton', 'm.hamilton']]];

      expect.assertions(data.length * 3);

      const res = data.map(nea(User));

      res.forEach((element, index) => {
        expect(element).toBeInstanceOf(User);
        expect(element.name).toBe(data[index][0][0]);
        expect(element.login).toBe(data[index][0][1]);
      });
    });
  });

  describe('given a constructor function taking a several params', () => {
    test('when wrapped in an array, then should return new instances', () => {
      type UserEntry = [string, string];

      class User {
        public name: string;
        public login: string;

        public constructor(name: string, login: string) {
          this.name = name;
          this.login = login;
        }
      }

      const data: UserEntry[] = [
        ['Ada Lovelace', 'a.lovelace'],
        ['Margaret Hamilton', 'm.hamilton'],
      ];

      expect.assertions(data.length * 3);

      const res = data.map(nea(User));

      res.forEach((element, index) => {
        expect(element).toBeInstanceOf(User);
        expect(element.name).toBe(data[index][0]);
        expect(element.login).toBe(data[index][1]);
      });
    });
  });
});
