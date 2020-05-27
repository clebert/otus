import {Allele} from './types';

/**
 * The created allele returns a random float between min (inclusive) and max (exclusive).
 */
export function createFloatAllele(
  min: number,
  max: number,
  randomFunction: () => number = Math.random
): Allele<number> {
  if (min >= max) {
    throw new Error('The min must be less than the max.');
  }

  // https://stackoverflow.com/a/1527820
  return () => randomFunction() * (max - min) + min;
}
