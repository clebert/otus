import * as otus from '.';

interface TestGenotype extends otus.Genotype {
  readonly geneA: otus.Allele<string>;
  readonly geneB: otus.Allele<string>;
  readonly geneC: otus.Allele<string>;
  readonly geneD: otus.Allele<string>;
}

describe('createUniformCrossoverOperator()', () => {
  test('uniform crossover', () => {
    const randomFunction = jest.fn();

    const crossoverOperator = otus.createUniformCrossoverOperator<TestGenotype>(
      0.5,
      randomFunction
    );

    randomFunction.mockReturnValueOnce(0.5);
    randomFunction.mockReturnValueOnce(0.9);
    randomFunction.mockReturnValueOnce(0.4);
    randomFunction.mockReturnValueOnce(0.1);

    expect(
      crossoverOperator(
        {geneA: 'a1', geneB: 'b1', geneC: 'c1', geneD: 'd1'},
        {geneA: 'a2', geneB: 'b2', geneC: 'c2', geneD: 'd2'}
      )
    ).toEqual({geneA: 'a1', geneB: 'b1', geneC: 'c2', geneD: 'd2'});
  });
});
