import { Constructors } from '../types';

type ParamsHandler<Fn extends Constructors.AnyConstructor> = (params: Constructors.MultiParams<Fn>) => InstanceType<Fn>;

export default function nea<Fn extends Constructors.AnyConstructor>(Fn: Fn): ParamsHandler<Fn> {
  return function handler(args) {
    return new Fn(...args);
  };
}
