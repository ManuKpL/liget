/* eslint-disable @typescript-eslint/no-explicit-any */

export type AnyConstructor = new (...params: any[]) => any;
export type SingleParamConstructor = new (...params: [any]) => any;

export type SingleParam<Fn extends SingleParamConstructor> = ConstructorParameters<Fn>[0];
export type MultiParams<Fn extends AnyConstructor> = ConstructorParameters<Fn>;
export type AnyParams<Fn extends AnyConstructor> = Fn extends SingleParamConstructor
  ? SingleParam<Fn>
  : MultiParams<Fn>;
export type Params<Fn extends AnyConstructor> = Fn extends AnyConstructor ? AnyParams<Fn> : never;
