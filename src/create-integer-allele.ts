import {type Allele} from './types.js';

/**
 * The created allele returns a random integer between min (inclusive) and max (inclusive).
 */
export function createIntegerAllele(
  min: number,
  max: number,
  randomFunction: () => number = Math.random,
): Allele<number> {
  if (min >= max) {
    throw new Error(`The min must be less than the max.`);
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  // https://stackoverflow.com/a/1527820
  return () => Math.floor(randomFunction() * (max - min + 1)) + min;
}
