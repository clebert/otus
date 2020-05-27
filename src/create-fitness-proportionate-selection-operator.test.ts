import {
  Allele,
  Genotype,
  Phenotype,
  SelectionOperator,
  createFitnessProportionateSelectionOperator,
} from '.';

interface TestGenotype extends Genotype {
  readonly fitness: Allele<number>;
}

describe('createFitnessProportionateSelectionOperator()', () => {
  let fitnessFunction: jest.Mock<number>;
  let randomFunction: jest.Mock<number>;
  let selectionOperator: SelectionOperator<TestGenotype>;

  beforeEach(() => {
    fitnessFunction = jest.fn(
      (phenotype: Phenotype<TestGenotype>) => phenotype.fitness
    );

    randomFunction = jest.fn();

    selectionOperator = createFitnessProportionateSelectionOperator(
      randomFunction
    );
  });

  test('failure in selecting a phenotype', () => {
    expect(() => selectionOperator([], fitnessFunction)).toThrow(
      new Error('No phenotype available to select.')
    );
  });

  test('success in selecting a phenotype', () => {
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
        fitnessFunction
      )
    ).toEqual({fitness: 5});
  });
});
