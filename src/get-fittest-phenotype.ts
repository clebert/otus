import type {GeneticAlgorithmState} from './genetic-algorithm.js';
import type {Genotype, Phenotype} from './types.js';

export function getFittestPhenotype<TGenotype extends Genotype>(
  state: GeneticAlgorithmState<TGenotype>,
): Phenotype<TGenotype> | undefined {
  const {phenotypes, fitnessFunction} = state;

  return phenotypes.length
    ? phenotypes.reduce(
        (fittestPhenotype, phenotype) =>
          fitnessFunction(phenotype) > fitnessFunction(fittestPhenotype)
            ? phenotype
            : fittestPhenotype,
        phenotypes[0]!,
      )
    : undefined;
}
