/* eslint-disable @typescript-eslint/no-explicit-any */

export type AnyFunction = (...params: any[]) => any;
export type NoParamFunction = () => any;
export type SingleParamFunction = (...params: [any]) => any;
export type SingleParamArrayFunction = (...params: [Array<any>]) => any;
export type MultiParamsFunction = (...params: [any, ...any[]]) => any;

export type NoParam = [never?];

export type SingleParam<Fn extends SingleParamFunction> = Fn extends SingleParamArrayFunction
  ? [Parameters<Fn>]
  : [Parameters<Fn>] | Parameters<Fn>;

export type MultiParams<Fn extends MultiParamsFunction> = [Parameters<Fn>];

export type SomeParams<Fn extends MultiParamsFunction> = Fn extends SingleParamFunction
  ? SingleParam<Fn>
  : MultiParams<Fn>;

export type AnyParams<Fn extends AnyFunction> = Fn extends NoParamFunction ? NoParam : SomeParams<Fn>;
