import {Allele, Genotype, getFittestPhenotype} from './index';

interface TestGenotype extends Genotype {
  readonly fitness: Allele<number>;
}

describe('getFittestPhenotype()', () => {
  test('fittest phenotype', () => {
    expect(
      getFittestPhenotype<TestGenotype>({
        genotype: {fitness: jest.fn()},
        phenotypes: [{fitness: -100}, {fitness: 100}, {fitness: 0}],
        populationSize: 100,
        elitePopulationSize: 1,
        fitnessFunction: (phenotype) => phenotype.fitness,
        selectionOperator: jest.fn(),
        crossoverOperator: jest.fn(),
        mutationOperator: jest.fn(),
      })
    ).toEqual({fitness: 100});
  });
});
