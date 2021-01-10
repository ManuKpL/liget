/* eslint-disable @typescript-eslint/ban-types */

import { Functions } from '../types';
import { unpackArgs } from '../utils';

export default function et<TargetObjet extends object, PropName extends keyof TargetObjet>(
  propName: PropName,
  ...params: TargetObjet[PropName] extends Functions.AnyFunction
    ? Functions.AnyParams<TargetObjet[PropName]>
    : Functions.NoParam
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
