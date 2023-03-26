import {
  cacheFitnessFunction,
  createFitnessProportionateSelectionOperator,
  createFloatAllele,
  createIntegerAllele,
  createUniformCrossoverOperator,
  createUniformMutationOperator,
  geneticAlgorithm,
  getFittestPhenotype,
} from './lib/index.js';

const smallNumberGenotype = {
  base: createFloatAllele(1, 10), // float between 1.0 (inclusive) and 10.0 (exclusive)
  exponent: createIntegerAllele(2, 4), // integer between 2 (inclusive) and 4 (inclusive)
};

/**
 * @param {import('./lib/index.js').Phenotype<typeof smallNumberGenotype>} smallNumberPhenotype
 */
function isAnswerToEverything(smallNumberPhenotype) {
  const number = Math.pow(
    smallNumberPhenotype.base,
    smallNumberPhenotype.exponent,
  );

  return number === 42 ? Number.MAX_SAFE_INTEGER : 1 / Math.abs(42 - number);
}

/**
 * @type {import('./lib/index.js').GeneticAlgorithmState<typeof smallNumberGenotype>}
 */
let state = {
  genotype: smallNumberGenotype,
  phenotypes: [],
  populationSize: 100,
  elitePopulationSize: 2,
  fitnessFunction: cacheFitnessFunction(isAnswerToEverything),
  selectionOperator: createFitnessProportionateSelectionOperator(),
  crossoverOperator: createUniformCrossoverOperator(0.5),
  mutationOperator: createUniformMutationOperator(0.1),
};

for (let i = 0; i < 100; i += 1) {
  state = geneticAlgorithm(state);
}

const answerToEverythingPhenotype = getFittestPhenotype(state);

if (!answerToEverythingPhenotype) {
  throw new Error(`I have no answer.`);
}

console.log(
  `The answer to everything:`,
  Math.pow(
    answerToEverythingPhenotype.base,
    answerToEverythingPhenotype.exponent,
  ),
  answerToEverythingPhenotype,
);
