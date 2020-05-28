import {Genotype, SelectionOperator} from './types';

export function createFitnessProportionateSelectionOperator<
  TGenotype extends Genotype
>(randomFunction: () => number = Math.random): SelectionOperator<TGenotype> {
  // https://arxiv.org/abs/1109.3627
  return (phenotypes, fitnessFunction) => {
    if (phenotypes.length === 0) {
      throw new Error('No phenotype available to select.');
    }

    const maxFitness = phenotypes.reduce(
      (fitness, phenotype) => Math.max(fitness, fitnessFunction(phenotype)),
      Number.NEGATIVE_INFINITY
    );

    while (true) {
      const phenotype =
        phenotypes[Math.floor(randomFunction() * phenotypes.length)];

      if (randomFunction() < fitnessFunction(phenotype) / maxFitness) {
        return phenotype;
      }
    }
  };
}
