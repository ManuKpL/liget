/* eslint-disable @typescript-eslint/ban-types */

import { Functions, FunctionParams } from './types';
import { unpackArgs } from './unpackArgs';

export function et<TargetObjet extends object, PropName extends keyof TargetObjet>(
  propName: PropName,
  ...params: TargetObjet[PropName] extends Functions.AnyFunction
    ? FunctionParams.AnyParams<TargetObjet[PropName]>
    : FunctionParams.NoParam
): (target: TargetObjet) => TargetObjet[PropName] {
  return function handler(target) {
    const value = target[propName];

    if (typeof value === 'function') {
      const args = unpackArgs(params);
      return value.apply(target, args);
    }

    return value;
  };
}
