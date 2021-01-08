/* eslint-disable @typescript-eslint/no-explicit-any */

export type AnyConstructor = new (...params: any[]) => any;
export type SingleParamConstructor = new (...params: [any]) => any;
