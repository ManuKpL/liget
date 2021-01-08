import { Functions, FunctionParams } from './types';

export function unpackArgs<Target>(
  params: Target extends Functions.AnyFunction ? FunctionParams.AnyParams<Target> : FunctionParams.NoParam,
): unknown[] {
  const [unpackedParams] = params;

  if (unpackedParams && Array.isArray(unpackedParams)) {
    return unpackedParams;
  }

  return params;
}
