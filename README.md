# Liget

The goal is to provide utils methods to use as shortcuts with functionnal processes such as Higher-Order functions.

## Usage

### Install

```
yarn add liget
```

Or

```
npm install --save liget
```

### Import

```JS
import liget, { et } from 'liget';

const namedExport   = data.map(et('propName'));
const defaultExport = data.map(liget.et('propName'));
```

## Methods

### `et()`

Given an array of objects such as

```JS
const users = [
  {
    firstName: 'Ada',
    lastName: 'Lovelace',
    name() {
      return `${this.firstName} ${this.lastName}`
    },
    greet(name: string) {
      console.log(`Hello ${name}, I'm ${this.name()}`);
    },
    introduce(first: string, second: string) {
      console.log(`Hello ${first}, I'm ${this.name()} and this is ${second}`);
    },
  },
  // ...
];

```

#### Property accessor

The `et()` function takes the name of the property as argument and returns its value.

```JS
import { et } from 'liget';

const firstNames = users.map(et('firstName'));

console.log(firstNames);
// ['Ada']
```

#### Method accessor

When the targeted method takes no parameter, the `et()` function takes the name of the method as its single argument.

```JS
import { et } from 'liget';

const names = users.map(et('name'));

console.log(names);
// ['Ada Lovelace']
```

When the targeted method takes a single parameter, the `et()` function takes the name of the method as its first argument and the parameter value as its second argument, either directly or wrapped in an array\*.

```JS
import { et } from 'liget';

users.forEach(et('greet', 'Margaret Hamilton'));
// "Hello Margaret Hamilton, I'm Ada Lovelace"

users.forEach(et('greet', ['Grace Hopper']));
// "Hello Grace Hopper, I'm Ada Lovelace"
```

> _\* caveat:_ when the method parameter is an array, it should always be wrapped in another array since it would be impossible to distinguish the desired value from a wrapped value (_i.e._ `['foo']` could be the argument value or a wrapped `'foo'` argument)

When the targeted method takes at least two parameters, the `et()` function takes the name of the method as its first argument and an array of parmater values as its second argument.

```JS
import { et } from 'liget';

users.forEach(et('introduce', ['Margaret Hamilton', 'Grace Hopper']));
// "Hello Margaret Hamilton, I'm Ada Lovelace and this is Grace Hopper"
```
