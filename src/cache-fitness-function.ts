import {FitnessFunction, Genotype, Phenotype} from './types';

export function cacheFitnessFunction<TGenotype extends Genotype>(
  fitnessFunction: FitnessFunction<TGenotype>
): FitnessFunction<TGenotype> {
  const fitnessCache = new WeakMap<Phenotype<TGenotype>, number>();

  return (phenotype) => {
    let fitness = fitnessCache.get(phenotype);

    if (fitness === undefined) {
      fitnessCache.set(phenotype, (fitness = fitnessFunction(phenotype)));
    }

    return fitness;
  };
}
