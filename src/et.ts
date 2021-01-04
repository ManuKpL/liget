/* eslint-disable @typescript-eslint/ban-types */

import { Functions, Params } from './types';
import { unpackArgs } from './unpackArgs';

export function et<TargetObjet extends object, PropName extends keyof TargetObjet>(
  propName: PropName,
  ...params: TargetObjet[PropName] extends Functions.AnyFunction
    ? Params.AnyParams<TargetObjet[PropName]>
    : Params.NoParam
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
