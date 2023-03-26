import {createFloatAllele} from './create-float-allele.js';
import {describe, expect, jest, test} from '@jest/globals';

describe(`createFloatAllele()`, () => {
  test(`invalid arguments`, () => {
    expect(() => createFloatAllele(1, 1)).toThrow(
      new Error(`The min must be less than the max.`),
    );

    expect(() => createFloatAllele(2, 1)).toThrow(
      new Error(`The min must be less than the max.`),
    );
  });

  test(`random float generation`, () => {
    const randomFunction = jest.fn<() => number>();
    const floatAllele = createFloatAllele(-5, 5, randomFunction);

    randomFunction.mockReturnValueOnce(0.0);
    randomFunction.mockReturnValueOnce(0.1);
    randomFunction.mockReturnValueOnce(0.2);
    randomFunction.mockReturnValueOnce(0.3);
    randomFunction.mockReturnValueOnce(0.4);
    randomFunction.mockReturnValueOnce(0.5);
    randomFunction.mockReturnValueOnce(0.6);
    randomFunction.mockReturnValueOnce(0.7);
    randomFunction.mockReturnValueOnce(0.8);
    randomFunction.mockReturnValueOnce(0.9);
    randomFunction.mockReturnValueOnce(0.99);

    expect(floatAllele()).toBe(-5);
    expect(floatAllele()).toBe(-4);
    expect(floatAllele()).toBe(-3);
    expect(floatAllele()).toBe(-2);
    expect(floatAllele()).toBe(-1);
    expect(floatAllele()).toBe(0);
    expect(floatAllele()).toBe(1);
    expect(floatAllele()).toBe(2);
    expect(floatAllele()).toBe(3);
    expect(floatAllele()).toBe(4);
    expect(floatAllele()).toBe(4.9);
  });
});
