import type {
  Allele,
  CrossoverOperator,
  FitnessFunction,
  Genotype,
  MutationOperator,
  SelectionOperator,
} from './types.js';

import {getFittestPhenotype} from './get-fittest-phenotype.js';
import {describe, expect, jest, test} from '@jest/globals';

interface TestGenotype extends Genotype {
  readonly fitness: Allele<number>;
}

describe(`getFittestPhenotype()`, () => {
  test(`fittest phenotype`, () => {
    expect(
      getFittestPhenotype<TestGenotype>({
        genotype: {fitness: jest.fn<Allele<number>>()},
        phenotypes: [{fitness: -100}, {fitness: 100}, {fitness: 0}],
        populationSize: 3,
        fitnessFunction: (phenotype) => phenotype.fitness,
        selectionOperator: jest.fn<SelectionOperator<TestGenotype>>(),
        crossoverOperator: jest.fn<CrossoverOperator<TestGenotype>>(),
        mutationOperator: jest.fn<MutationOperator<TestGenotype>>(),
      }),
    ).toEqual({fitness: 100});
  });

  test(`empty phenotypes`, () => {
    expect(
      getFittestPhenotype<TestGenotype>({
        genotype: {fitness: jest.fn<Allele<number>>()},
        phenotypes: [],
        populationSize: 3,
        fitnessFunction: jest.fn<FitnessFunction<TestGenotype>>(),
        selectionOperator: jest.fn<SelectionOperator<TestGenotype>>(),
        crossoverOperator: jest.fn<CrossoverOperator<TestGenotype>>(),
        mutationOperator: jest.fn<MutationOperator<TestGenotype>>(),
      }),
    ).toBe(undefined);
  });
});
