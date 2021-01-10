import neo from './neo';

describe('neo()', () => {
  test('should be defined', () => {
    expect(neo).toBeDefined();
  });

  test('should be a function', () => {
    expect(typeof neo).toBe('function');
  });

  test('given a constructor function taking a single string param, then should return new instances', () => {
    class User {
      public constructor(public name: string) {}
    }

    const data = ['Jane', 'Mary'];
    expect.assertions(data.length * 2);

    const res = data.map(neo(User));

    res.forEach((element, index) => {
      expect(element).toBeInstanceOf(User);
      expect(element.name).toBe(data[index]);
    });
  });

  test('given a constructor function taking a single object param, then should return new instances', () => {
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

    const data: UserJson[] = [
      { name: 'Ada Lovelace', login: 'a.lovelace' },
      { name: 'Margaret Hamilton', login: 'm.hamilton' },
    ];

    expect.assertions(data.length * 3);

    const res = data.map(neo(User));

    res.forEach((element, index) => {
      expect(element).toBeInstanceOf(User);
      expect(element.name).toBe(data[index].name);
      expect(element.login).toBe(data[index].login);
    });
  });

  test('given a constructor function taking a single array param, then should return new instances', () => {
    type UserEntry = [string, string];

    class User {
      public name: string;
      public login: string;

      public constructor([name, login]: UserEntry) {
        this.name = name;
        this.login = login;
      }
    }

    const data: UserEntry[] = [
      ['Ada Lovelace', 'a.lovelace'],
      ['Margaret Hamilton', 'm.hamilton'],
    ];

    expect.assertions(data.length * 3);

    const res = data.map(neo(User));

    res.forEach((element, index) => {
      expect(element).toBeInstanceOf(User);
      expect(element.name).toBe(data[index][0]);
      expect(element.login).toBe(data[index][1]);
    });
  });
});
