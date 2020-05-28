import * as otus from '.';

interface SmallNumberGenotype extends otus.Genotype {
  readonly base: otus.Allele<number>;
  readonly exponent: otus.Allele<number>;
}

const smallNumberGenotype: SmallNumberGenotype = {
  base: otus.createFloatAllele(1, 10),
  exponent: otus.createIntegerAllele(2, 4),
};

function isAnswerToEverything(
  smallNumberPhenotype: otus.Phenotype<SmallNumberGenotype>
): number {
  const number = Math.pow(
    smallNumberPhenotype.base,
    smallNumberPhenotype.exponent
  );

  return number === 42 ? Number.MAX_SAFE_INTEGER : 1 / Math.abs(42 - number);
}

describe('geneticAlgorithm()', () => {
  test('invalid arguments', () => {
    expect(() =>
      otus.geneticAlgorithm({
        genotype: smallNumberGenotype,
        phenotypes: [
          {base: 1, exponent: 2},
          {base: 3, exponent: 4},
        ],
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
        genotype: smallNumberGenotype,
        phenotypes: [
          {base: 1, exponent: 2},
          {base: 3, exponent: 4},
        ],
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

  test('no elitism', () => {
    const answerToEverythingPhenotype: otus.Phenotype<SmallNumberGenotype> = {
      base: Math.sqrt(42),
      exponent: 2,
    };

    expect(
      Math.pow(
        answerToEverythingPhenotype.base,
        answerToEverythingPhenotype.exponent
      )
    ).toBe(42);

    const state = otus.geneticAlgorithm<SmallNumberGenotype>({
      genotype: {base: () => Math.sqrt(49), exponent: () => 2},
      phenotypes: [answerToEverythingPhenotype, answerToEverythingPhenotype],
      populationSize: 2,
      fitnessFunction: otus.cacheFitnessFunction(isAnswerToEverything),
      selectionOperator: otus.createFitnessProportionateSelectionOperator(),
      crossoverOperator: otus.createUniformCrossoverOperator(0.5),
      mutationOperator: otus.createUniformMutationOperator(1),
    });

    const answerToNothingPhenotype = otus.getFittestPhenotype(state);

    const answerToNothing = Math.pow(
      answerToNothingPhenotype!.base,
      answerToNothingPhenotype!.exponent
    );

    expect(answerToNothing).toBe(49);
  });

  test('answer to everything', () => {
    let state: otus.GeneticAlgorithmState<SmallNumberGenotype> = {
      genotype: smallNumberGenotype,
      phenotypes: [],
      populationSize: 100,
      elitePopulationSize: 1,
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
