import type {Genotype, Phenotype} from './types.js';

export function createRandomPhenotype<TGenotype extends Genotype>(
  genotype: TGenotype,
): Phenotype<TGenotype> {
  return Object.keys(genotype).reduce((newPhenotype, geneName) => {
    newPhenotype[geneName] = genotype[geneName]!();

    return newPhenotype;
  }, {} as Record<string, any>) as Phenotype<TGenotype>;
}
