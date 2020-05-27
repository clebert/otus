import {CrossoverOperator, Genotype, Phenotype} from './types';

export function createUniformCrossoverOperator<TGenotype extends Genotype>(
  probability: number,
  randomFunction: () => number = Math.random
): CrossoverOperator<TGenotype> {
  return (phenotypeA, phenotypeB) =>
    Object.keys(phenotypeA).reduce((newPhenotype, geneName) => {
      newPhenotype[geneName] =
        randomFunction() < probability
          ? phenotypeB[geneName]
          : phenotypeA[geneName];

      return newPhenotype;
    }, {} as Record<string, any>) as Phenotype<TGenotype>;
}
