import { Constructors } from '../types';

type ParamsHandler<Fn extends Constructors.SingleParamConstructor> = (
  params: Constructors.SingleParam<Fn>,
) => InstanceType<Fn>;

export default function neo<Fn extends Constructors.SingleParamConstructor>(Fn: Fn): ParamsHandler<Fn> {
  return function handler(args) {
    return new Fn(args);
  };
}
