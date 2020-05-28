import * as otus from '.';

interface TestGenotype extends otus.Genotype {
  readonly fitness: otus.Allele<number>;
}

describe('cacheFitnessFunction()', () => {
  test('fitness cache', () => {
    const phenotypeA = {fitness: 0};
    const phenotypeB = {fitness: 1};

    const fitnessFunction = jest.fn(
      (phenotype: otus.Phenotype<TestGenotype>) => phenotype.fitness
    );

    const cachedFitnessFunction = otus.cacheFitnessFunction(fitnessFunction);

    expect(cachedFitnessFunction(phenotypeA)).toBe(0);
    expect(cachedFitnessFunction(phenotypeB)).toBe(1);
    expect(cachedFitnessFunction(phenotypeA)).toBe(0);
    expect(cachedFitnessFunction(phenotypeB)).toBe(1);
    expect(fitnessFunction).toHaveBeenCalledTimes(2);
  });
});
