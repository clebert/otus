import {Genotype, MutationOperator, Phenotype} from './types';

export function createUniformMutationOperator<TGenotype extends Genotype>(
  probability: number,
  randomFunction: () => number = Math.random
): MutationOperator<TGenotype> {
  return (phenotype, genotype) =>
    Object.keys(phenotype).reduce((newPhenotype, geneName) => {
      newPhenotype[geneName] =
        randomFunction() < probability
          ? genotype[geneName]!()
          : phenotype[geneName];

      return newPhenotype;
    }, {} as Record<string, any>) as Phenotype<TGenotype>;
}
