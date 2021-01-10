# Liget

The goal is to provide util methods to use as shortcuts with functionnal processes such as Higher-Order functions.

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

Import all features at lib level :

```JS
import liget from 'liget';
```

## Features

### `et()`

This function is a shortcut for props & methods on a list of objects. Example:

```JS
users.map((user) => user.name);
// vs
users.map(et('name'));
```

#### Import

```JS
import et from 'liget/et';
// OR
import { et } from 'liget';
```

#### Behaviour

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

#### Property access

The `et()` function takes the name of the property as argument and returns its value.

```JS
const firstNames = users.map(et('firstName'));

console.log(firstNames);
// ['Ada']
```

#### Method invocation

When the targeted method takes no parameter, the `et()` function takes the name of the method as its single argument.

```JS
const names = users.map(et('name'));

console.log(names);
// ['Ada Lovelace']
```

When the targeted method takes a single parameter, the `et()` function takes the name of the method as its first argument and the parameter value as its second argument, either directly or wrapped in an array\*.

```JS
users.forEach(et('greet', 'Margaret Hamilton'));
// "Hello Margaret Hamilton, I'm Ada Lovelace"

users.forEach(et('greet', ['Grace Hopper']));
// "Hello Grace Hopper, I'm Ada Lovelace"
```

> _\* caveat:_ when the method parameter is an array, it should always be wrapped in another array since it would be impossible to distinguish the desired value from a wrapped value (_i.e._ `['foo']` could be the argument value or a wrapped `'foo'` argument)

When the targeted method takes at least two parameters, the `et()` function takes the name of the method as its first argument and an array of parmater values as its second argument.

```JS
users.forEach(et('introduce', ['Margaret Hamilton', 'Grace Hopper']));
// "Hello Margaret Hamilton, I'm Ada Lovelace and this is Grace Hopper"
```

### `neo()`

This function is a shortcut for class instantiation from a list of values. Example:

```JS
documents.map((doc) => new User(doc));
// vs
documents.map(neo(UserModel));
```

#### Import

```JS
import neo from 'liget/neo';
// OR
import { neo } from 'liget';
```

#### Behaviour

This function is meant to be used with single param constructor functions only, whatever type that param may be.

Example:

```JS
function User({ name, login }) {
  this.name = name;
  this.login = login;
}

const data = [
  { name: 'Ada Lovelace', login: 'a.lovelace' },
  { name: 'Margaret Hamilton', login: 'm.hamilton' },
];

data.map(neo(User));
```
