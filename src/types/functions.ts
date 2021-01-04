/* eslint-disable @typescript-eslint/no-explicit-any */

export type AnyFunction = (...params: any[]) => any;
export type NoParamFunction = () => any;
export type SingleParamFunction = (...params: [any]) => any;
export type SingleParamArrayFunction = (...params: [Array<any>]) => any;
export type MultiParamsFunction = (...params: [any, ...any[]]) => any;
