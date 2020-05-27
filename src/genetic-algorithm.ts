import {createRandomPhenotype} from './create-random-phenotype';
import {
  CrossoverOperator,
  FitnessFunction,
  Genotype,
  MutationOperator,
  Phenotype,
  SelectionOperator,
} from './types';

export interface GeneticAlgorithmState<TGenotype extends Genotype> {
  readonly genotype: TGenotype;
  readonly phenotypes: readonly Phenotype<TGenotype>[];
  readonly populationSize: number;
  readonly elitePopulationSize?: number;
  readonly fitnessFunction: FitnessFunction<TGenotype>;
  readonly selectionOperator: SelectionOperator<TGenotype>;
  readonly crossoverOperator: CrossoverOperator<TGenotype>;
  readonly mutationOperator: MutationOperator<TGenotype>;
}

export function geneticAlgorithm<TGenotype extends Genotype>(
  state: GeneticAlgorithmState<TGenotype>
): GeneticAlgorithmState<TGenotype> {
  const {
    genotype,
    populationSize,
    elitePopulationSize = 0,
    fitnessFunction,
    selectionOperator,
    crossoverOperator,
    mutationOperator,
  } = state;

  const inputPhenotypes = [...state.phenotypes];

  if (inputPhenotypes.length > populationSize) {
    throw new Error('TODO1');
  }

  if (elitePopulationSize >= populationSize) {
    throw new Error('TODO2');
  }

  while (inputPhenotypes.length < populationSize) {
    inputPhenotypes.push(createRandomPhenotype(genotype));
  }

  const outputPhenotypes: Phenotype<TGenotype>[] = [];

  if (elitePopulationSize > 0) {
    inputPhenotypes.sort(
      (phenotypeA, phenotypeB) =>
        fitnessFunction(phenotypeB) - fitnessFunction(phenotypeA)
    );

    outputPhenotypes.push(...inputPhenotypes.slice(0, elitePopulationSize));
  }

  while (outputPhenotypes.length < populationSize) {
    outputPhenotypes.push(
      mutationOperator(
        crossoverOperator(
          selectionOperator(inputPhenotypes, fitnessFunction),
          selectionOperator(inputPhenotypes, fitnessFunction)
        ),
        genotype
      )
    );
  }

  return {...state, phenotypes: outputPhenotypes};
}
