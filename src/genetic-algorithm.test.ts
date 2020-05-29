import * as otus from '.';

interface TestGenotype extends otus.Genotype {
  readonly fitness: otus.Allele<number>;
}

describe('geneticAlgorithm()', () => {
  test('invalid arguments', () => {
    expect(() =>
      otus.geneticAlgorithm<TestGenotype>({
        genotype: {fitness: jest.fn()},
        phenotypes: [{fitness: 75}, {fitness: 100}],
        populationSize: 1,
        fitnessFunction: jest.fn(),
        selectionOperator: jest.fn(),
        crossoverOperator: jest.fn(),
        mutationOperator: jest.fn(),
      })
    ).toThrow(
      new Error('There are more phenotypes than the population size allows.')
    );

    expect(() =>
      otus.geneticAlgorithm({
        genotype: {fitness: jest.fn()},
        phenotypes: [{fitness: 75}, {fitness: 100}],
        populationSize: 2,
        elitePopulationSize: 2,
        fitnessFunction: jest.fn(),
        selectionOperator: jest.fn(),
        crossoverOperator: jest.fn(),
        mutationOperator: jest.fn(),
      })
    ).toThrow(
      new Error(
        'The elite population size must be smaller than the total population size.'
      )
    );
  });

  test('elitism', () => {
    const state = otus.geneticAlgorithm<TestGenotype>({
      genotype: {fitness: () => 0},
      phenotypes: [
        {fitness: 75},
        {fitness: 25},
        {fitness: 50},
        {fitness: -100},
        {fitness: 100},
      ],
      populationSize: 5,
      elitePopulationSize: 2,
      fitnessFunction: otus.cacheFitnessFunction(
        (phenotype) => phenotype.fitness
      ),
      selectionOperator: otus.createFitnessProportionateSelectionOperator(),
      crossoverOperator: otus.createUniformCrossoverOperator(0),
      mutationOperator: otus.createUniformMutationOperator(1),
    });

    expect(state.phenotypes).toEqual([
      {fitness: 100},
      {fitness: 75},
      {fitness: 0},
      {fitness: 0},
      {fitness: 0},
    ]);
  });

  test('no elitism', () => {
    const state = otus.geneticAlgorithm<TestGenotype>({
      genotype: {fitness: () => 0},
      phenotypes: [
        {fitness: 75},
        {fitness: 25},
        {fitness: 50},
        {fitness: -100},
        {fitness: 100},
      ],
      populationSize: 5,
      fitnessFunction: otus.cacheFitnessFunction(
        (phenotype) => phenotype.fitness
      ),
      selectionOperator: otus.createFitnessProportionateSelectionOperator(),
      crossoverOperator: otus.createUniformCrossoverOperator(0),
      mutationOperator: otus.createUniformMutationOperator(1),
    });

    expect(state.phenotypes).toEqual([
      {fitness: 0},
      {fitness: 0},
      {fitness: 0},
      {fitness: 0},
      {fitness: 0},
    ]);
  });

  test('answer to everything', () => {
    const smallNumberGenotype = {
      base: otus.createFloatAllele(1, 10),
      exponent: otus.createIntegerAllele(2, 4),
    };

    function isAnswerToEverything(
      smallNumberPhenotype: otus.Phenotype<typeof smallNumberGenotype>
    ): number {
      const number = Math.pow(
        smallNumberPhenotype.base,
        smallNumberPhenotype.exponent
      );

      return number === 42
        ? Number.MAX_SAFE_INTEGER
        : 1 / Math.abs(42 - number);
    }

    let state: otus.GeneticAlgorithmState<typeof smallNumberGenotype> = {
      genotype: smallNumberGenotype,
      phenotypes: [],
      populationSize: 100,
      elitePopulationSize: 2,
      fitnessFunction: otus.cacheFitnessFunction(isAnswerToEverything),
      selectionOperator: otus.createFitnessProportionateSelectionOperator(),
      crossoverOperator: otus.createUniformCrossoverOperator(0.5),
      mutationOperator: otus.createUniformMutationOperator(0.1),
    };

    for (let i = 0; i < 100; i += 1) {
      state = otus.geneticAlgorithm(state);
    }

    const answerToEverythingPhenotype = otus.getFittestPhenotype(state);

    const answerToEverything = Math.pow(
      answerToEverythingPhenotype!.base,
      answerToEverythingPhenotype!.exponent
    );

    expect(answerToEverything).toBeGreaterThan(41);
    expect(answerToEverything).toBeLessThan(43);
  });
});
