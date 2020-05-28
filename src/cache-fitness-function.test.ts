import {Allele, Genotype, Phenotype, cacheFitnessFunction} from './index';

interface TestGenotype extends Genotype {
  readonly fitness: Allele<number>;
}

describe('cacheFitnessFunction()', () => {
  test('fitness cache', () => {
    const phenotypeA = {fitness: 0};
    const phenotypeB = {fitness: 1};

    const fitnessFunction = jest.fn(
      (phenotype: Phenotype<TestGenotype>) => phenotype.fitness
    );

    const cachedFitnessFunction = cacheFitnessFunction(fitnessFunction);

    expect(cachedFitnessFunction(phenotypeA)).toBe(0);
    expect(cachedFitnessFunction(phenotypeB)).toBe(1);
    expect(cachedFitnessFunction(phenotypeA)).toBe(0);
    expect(cachedFitnessFunction(phenotypeB)).toBe(1);
    expect(fitnessFunction).toHaveBeenCalledTimes(2);
  });
});
