import { Constructors } from './types';

type ParamsHandler<Fn extends Constructors.AnyConstructor> = (params: Constructors.Params<Fn>) => InstanceType<Fn>;

export function neo<Fn extends Constructors.AnyConstructor>(Fn: Fn): ParamsHandler<Fn> {
  return function handler(args) {
    return new Fn(args);
  };
}
