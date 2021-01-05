import { ConstructorParams, Constructors } from './types';

export function neo<ConstructorFunction extends Constructors.AnyConstructor>(
  Fn: ConstructorFunction,
): (
  params: ConstructorFunction extends Constructors.AnyConstructor
    ? ConstructorParams.AnyParams<ConstructorFunction>
    : never,
) => InstanceType<ConstructorFunction> {
  return function handler(args) {
    return new Fn(args);
  };
}
