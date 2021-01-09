import { Functions } from './types';

export function unpackArgs<Target>(
  params: Target extends Functions.AnyFunction ? Functions.AnyParams<Target> : Functions.NoParam,
): unknown[] {
  const [unpackedParams] = params;

  if (unpackedParams && Array.isArray(unpackedParams)) {
    return unpackedParams;
  }

  return params;
}
