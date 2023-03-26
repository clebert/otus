import {describe, expect, jest, test} from '@jest/globals';
import {createUniformMutationOperator} from './create-uniform-mutation-operator.js';
import type {Allele, Genotype} from './types.js';

interface TestGenotype extends Genotype {
  readonly geneA: Allele<string>;
  readonly geneB: Allele<string>;
  readonly geneC: Allele<string>;
  readonly geneD: Allele<string>;
}

describe(`createUniformMutationOperator()`, () => {
  test(`uniform mutation`, () => {
    const randomFunction = jest.fn<() => number>();

    const crossoverOperator = createUniformMutationOperator<TestGenotype>(
      0.5,
      randomFunction,
    );

    randomFunction.mockReturnValueOnce(0.5);
    randomFunction.mockReturnValueOnce(0.9);
    randomFunction.mockReturnValueOnce(0.4);
    randomFunction.mockReturnValueOnce(0.1);

    expect(
      crossoverOperator(
        {geneA: `a1`, geneB: `b1`, geneC: `c1`, geneD: `d1`},
        {
          geneA: () => `a2`,
          geneB: () => `b2`,
          geneC: () => `c2`,
          geneD: () => `d2`,
        },
      ),
    ).toEqual({geneA: `a1`, geneB: `b1`, geneC: `c2`, geneD: `d2`});
  });
});
