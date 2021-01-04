import { Functions, Params } from './types';

export function unpackArgs<Target>(
  params: Target extends Functions.AnyFunction ? Params.AnyParams<Target> : Params.NoParam,
): unknown[] {
  const [unpackedParams] = params;

  if (unpackedParams && Array.isArray(unpackedParams)) {
    return unpackedParams;
  }

  return params;
}
