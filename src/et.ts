/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

type AnyFunction = (...params: any[]) => any;
type NoParamFunction = () => any;
type SingleParamFunction = (...params: [any]) => any;
type MultiParamsFunction = (...params: [any, ...any[]]) => any;

type NoParam = [never?];
type SingleParam<Fn extends SingleParamFunction> = Parameters<Fn>[0] extends Array<unknown>
  ? [Parameters<Fn>]
  : [Parameters<Fn>] | Parameters<Fn>;
type MultiParams<Fn extends MultiParamsFunction> = [Parameters<Fn>];
type SomeParams<Fn extends MultiParamsFunction> = Fn extends SingleParamFunction ? SingleParam<Fn> : MultiParams<Fn>;
type AnyParams<Fn extends AnyFunction> = Fn extends NoParamFunction ? NoParam : SomeParams<Fn>;

export function et<TargetObjet extends object, PropName extends keyof TargetObjet>(
  propName: PropName,
  ...params: TargetObjet[PropName] extends AnyFunction ? AnyParams<TargetObjet[PropName]> : NoParam
): (target: TargetObjet) => TargetObjet[PropName] {
  return function (target) {
    const value = target[propName];
    if (typeof value === 'function') {
      const args = unpackArgs(params);
      return value.apply(target, args);
    }
    return value;
  };
}

function unpackArgs<Fn>(params: Fn extends AnyFunction ? AnyParams<Fn> : NoParam): unknown[] {
  const [unpackedParams] = params;

  if (unpackedParams && Array.isArray(unpackedParams)) {
    return unpackedParams;
  }

  return params;
}
