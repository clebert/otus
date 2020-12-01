import * as otus from '.';

interface TestGenotype extends otus.Genotype {
  readonly fitness: otus.Allele<number>;
}

describe('getFittestPhenotype()', () => {
  test('fittest phenotype', () => {
    expect(
      otus.getFittestPhenotype<TestGenotype>({
        genotype: {fitness: jest.fn()},
        phenotypes: [{fitness: -100}, {fitness: 100}, {fitness: 0}],
        populationSize: 3,
        fitnessFunction: (phenotype) => phenotype.fitness,
        selectionOperator: jest.fn(),
        crossoverOperator: jest.fn(),
        mutationOperator: jest.fn(),
      })
    ).toEqual({fitness: 100});
  });

  test('empty phenotypes', () => {
    expect(
      otus.getFittestPhenotype<TestGenotype>({
        genotype: {fitness: jest.fn()},
        phenotypes: [],
        populationSize: 3,
        fitnessFunction: jest.fn(),
        selectionOperator: jest.fn(),
        crossoverOperator: jest.fn(),
        mutationOperator: jest.fn(),
      })
    ).toBe(undefined);
  });
});
