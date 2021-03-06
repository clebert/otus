// @ts-check

const otus = require('./lib/cjs/index');

const smallNumberGenotype = {
  base: otus.createFloatAllele(1, 10), // float between 1.0 (inclusive) and 10.0 (exclusive)
  exponent: otus.createIntegerAllele(2, 4), // integer between 2 (inclusive) and 4 (inclusive)
};

/**
 * @param {import('./lib/cjs').Phenotype<typeof smallNumberGenotype>} smallNumberPhenotype
 */
function isAnswerToEverything(smallNumberPhenotype) {
  const number = Math.pow(
    smallNumberPhenotype.base,
    smallNumberPhenotype.exponent
  );

  return number === 42 ? Number.MAX_SAFE_INTEGER : 1 / Math.abs(42 - number);
}

/**
 * @type {import('./lib/cjs').GeneticAlgorithmState<typeof smallNumberGenotype>}
 */
let state = {
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

console.log(
  'The answer to everything:',
  Math.pow(
    answerToEverythingPhenotype.base,
    answerToEverythingPhenotype.exponent
  ),
  answerToEverythingPhenotype
);
