import * as Functions from './functions';

export type NoParam = [never?];

export type SingleParam<Fn extends Functions.SingleParamFunction> = Fn extends Functions.SingleParamArrayFunction
  ? [Parameters<Fn>]
  : [Parameters<Fn>] | Parameters<Fn>;

export type MultiParams<Fn extends Functions.MultiParamsFunction> = [Parameters<Fn>];

export type SomeParams<Fn extends Functions.MultiParamsFunction> = Fn extends Functions.SingleParamFunction
  ? SingleParam<Fn>
  : MultiParams<Fn>;

export type AnyParams<Fn extends Functions.AnyFunction> = Fn extends Functions.NoParamFunction
  ? NoParam
  : SomeParams<Fn>;
