import * as otus from '.';

interface TestGenotype extends otus.Genotype {
  readonly geneA: otus.Allele<string>;
  readonly geneB: otus.Allele<string>;
}

describe('createRandomPhenotype()', () => {
  test('random phenotype creation', () => {
    expect(
      otus.createRandomPhenotype<TestGenotype>({
        geneA: () => 'a',
        geneB: () => 'b',
      })
    ).toEqual({geneA: 'a', geneB: 'b'});
  });
});
