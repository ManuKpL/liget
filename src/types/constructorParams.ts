import * as Constructors from './constructors';

export type SingleParam<Fn extends Constructors.SingleParamConstructor> = ConstructorParameters<Fn>[0];

export type AnyParams<Fn extends Constructors.AnyConstructor> = Fn extends Constructors.SingleParamConstructor
  ? SingleParam<Fn>
  : never;
