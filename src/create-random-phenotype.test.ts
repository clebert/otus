import {describe, expect, test} from '@jest/globals';
import {createRandomPhenotype} from './create-random-phenotype.js';
import {type Allele, type Genotype} from './types.js';

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
