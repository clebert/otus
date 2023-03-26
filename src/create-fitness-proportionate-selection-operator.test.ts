import type {Allele, Genotype, Phenotype} from './types.js';

import {createFitnessProportionateSelectionOperator} from './create-fitness-proportionate-selection-operator.js';
import {describe, expect, jest, test} from '@jest/globals';

interface TestGenotype extends Genotype {
  readonly fitness: Allele<number>;
}

describe(`createFitnessProportionateSelectionOperator()`, () => {
  test(`invalid arguments`, () => {
    expect(() =>
      createFitnessProportionateSelectionOperator()([], () => 0),
    ).toThrow(new Error(`No phenotype available to select.`));
  });

  test(`fitness proportionate selection (single individual)`, () => {
    const fitnessFunction = jest.fn(
      (phenotype: Phenotype<TestGenotype>) => phenotype.fitness,
    );

    const randomFunction = jest.fn<() => number>();

    const selectionOperator =
      createFitnessProportionateSelectionOperator<TestGenotype>(randomFunction);

    randomFunction.mockReturnValueOnce(0);
    randomFunction.mockReturnValueOnce(0);

    expect(selectionOperator([{fitness: 5}], fitnessFunction)).toEqual({
      fitness: 5,
    });
  });

  test(`fitness proportionate selection (several individuals)`, () => {
    const fitnessFunction = jest.fn(
      (phenotype: Phenotype<TestGenotype>) => phenotype.fitness,
    );

    const randomFunction = jest.fn<() => number>();

    const selectionOperator =
      createFitnessProportionateSelectionOperator<TestGenotype>(randomFunction);

    randomFunction.mockReturnValueOnce(0.75 /* random index = 3 */);
    randomFunction.mockReturnValueOnce(0.85 /* probability = 0.85 < 0.75 */);
    randomFunction.mockReturnValueOnce(0.25 /* random index = 1 */);
    randomFunction.mockReturnValueOnce(0.5 /* probability = 0.5 < 0.5 */);
    randomFunction.mockReturnValueOnce(0.24 /* random index = 0 */);
    randomFunction.mockReturnValueOnce(0.15 /* probability = 0.15 < 0.25 */);

    expect(
      selectionOperator(
        [
          {fitness: 5}, // 5 / 20 = 0.25
          {fitness: 10}, // 10 / 20 = 0.5
          {fitness: 20}, // 20 / 20 = 1
          {fitness: 15}, // 15 / 20 = 0.75
        ],
        fitnessFunction,
      ),
    ).toEqual({fitness: 5});
  });
});
