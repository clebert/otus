import {Allele, Genotype, createRandomPhenotype} from './index';

interface TestGenotype extends Genotype {
  readonly geneA: Allele<string>;
  readonly geneB: Allele<string>;
}

describe('createRandomPhenotype()', () => {
  test('random phenotype creation', () => {
    expect(
      createRandomPhenotype<TestGenotype>({geneA: () => 'a', geneB: () => 'b'})
    ).toEqual({geneA: 'a', geneB: 'b'});
  });
});
