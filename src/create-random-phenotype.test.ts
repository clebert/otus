import type {Allele, Genotype} from './types.js';

import {createRandomPhenotype} from './create-random-phenotype.js';
import {describe, expect, test} from '@jest/globals';

interface TestGenotype extends Genotype {
  readonly geneA: Allele<string>;
  readonly geneB: Allele<string>;
}

describe(`createRandomPhenotype()`, () => {
  test(`random phenotype creation`, () => {
    expect(
      createRandomPhenotype<TestGenotype>({geneA: () => `a`, geneB: () => `b`}),
    ).toEqual({geneA: `a`, geneB: `b`});
  });
});
