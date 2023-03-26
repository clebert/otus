import type {GeneticAlgorithmState} from './genetic-algorithm.js';
import type {
  Allele,
  CrossoverOperator,
  FitnessFunction,
  Genotype,
  MutationOperator,
  Phenotype,
  SelectionOperator,
} from './types.js';

import {cacheFitnessFunction} from './cache-fitness-function.js';
import {createFitnessProportionateSelectionOperator} from './create-fitness-proportionate-selection-operator.js';
import {createFloatAllele} from './create-float-allele.js';
import {createIntegerAllele} from './create-integer-allele.js';
import {createUniformCrossoverOperator} from './create-uniform-crossover-operator.js';
import {createUniformMutationOperator} from './create-uniform-mutation-operator.js';
import {geneticAlgorithm} from './genetic-algorithm.js';
import {getFittestPhenotype} from './get-fittest-phenotype.js';
import {describe, expect, jest, test} from '@jest/globals';

interface TestGenotype extends Genotype {
  readonly fitness: Allele<number>;
}

describe(`geneticAlgorithm()`, () => {
  test(`invalid arguments`, () => {
    expect(() =>
      geneticAlgorithm<TestGenotype>({
        genotype: {fitness: jest.fn<Allele<number>>()},
        phenotypes: [{fitness: 75}, {fitness: 100}],
        populationSize: 1,
        fitnessFunction: jest.fn<FitnessFunction<TestGenotype>>(),
        selectionOperator: jest.fn<SelectionOperator<TestGenotype>>(),
        crossoverOperator: jest.fn<CrossoverOperator<TestGenotype>>(),
        mutationOperator: jest.fn<MutationOperator<TestGenotype>>(),
      }),
    ).toThrow(
      new Error(`There are more phenotypes than the population size allows.`),
    );

    expect(() =>
      geneticAlgorithm({
        genotype: {fitness: jest.fn()},
        phenotypes: [{fitness: 75}, {fitness: 100}],
        populationSize: 2,
        elitePopulationSize: 2,
        fitnessFunction: jest.fn<FitnessFunction<Genotype>>(),
        selectionOperator: jest.fn<SelectionOperator<Genotype>>(),
        crossoverOperator: jest.fn<CrossoverOperator<Genotype>>(),
        mutationOperator: jest.fn<MutationOperator<Genotype>>(),
      }),
    ).toThrow(
      new Error(
        `The elite population size must be smaller than the total population size.`,
      ),
    );
  });

  test(`elitism`, () => {
    const state = geneticAlgorithm<TestGenotype>({
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
      fitnessFunction: cacheFitnessFunction((phenotype) => phenotype.fitness),
      selectionOperator: createFitnessProportionateSelectionOperator(),
      crossoverOperator: createUniformCrossoverOperator(0),
      mutationOperator: createUniformMutationOperator(1),
    });

    expect(state.phenotypes).toEqual([
      {fitness: 100},
      {fitness: 75},
      {fitness: 0},
      {fitness: 0},
      {fitness: 0},
    ]);
  });

  test(`no elitism`, () => {
    const state = geneticAlgorithm<TestGenotype>({
      genotype: {fitness: () => 0},
      phenotypes: [
        {fitness: 75},
        {fitness: 25},
        {fitness: 50},
        {fitness: -100},
        {fitness: 100},
      ],
      populationSize: 5,
      fitnessFunction: cacheFitnessFunction((phenotype) => phenotype.fitness),
      selectionOperator: createFitnessProportionateSelectionOperator(),
      crossoverOperator: createUniformCrossoverOperator(0),
      mutationOperator: createUniformMutationOperator(1),
    });

    expect(state.phenotypes).toEqual([
      {fitness: 0},
      {fitness: 0},
      {fitness: 0},
      {fitness: 0},
      {fitness: 0},
    ]);
  });

  test(`answer to everything`, () => {
    const smallNumberGenotype = {
      base: createFloatAllele(1, 10),
      exponent: createIntegerAllele(2, 4),
    };

    function isAnswerToEverything(
      smallNumberPhenotype: Phenotype<typeof smallNumberGenotype>,
    ): number {
      const number = Math.pow(
        smallNumberPhenotype.base,
        smallNumberPhenotype.exponent,
      );

      return number === 42
        ? Number.MAX_SAFE_INTEGER
        : 1 / Math.abs(42 - number);
    }

    let state: GeneticAlgorithmState<typeof smallNumberGenotype> = {
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

    const answerToEverything = Math.pow(
      answerToEverythingPhenotype!.base,
      answerToEverythingPhenotype!.exponent,
    );

    expect(answerToEverything).toBeGreaterThan(41);
    expect(answerToEverything).toBeLessThan(43);
  });
});
