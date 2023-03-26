export interface Genotype {
  readonly [geneName: string]: Allele<any>;
}

export type Allele<TValue> = () => TValue;

export type Phenotype<TGenotype extends Genotype> = {
  readonly [TGeneName in keyof TGenotype]: Gene<TGenotype, TGeneName>;
};

export type Gene<
  TGenotype extends Genotype,
  TGeneName extends keyof TGenotype,
> = ReturnType<TGenotype[TGeneName]>;

export type SelectionOperator<TGenotype extends Genotype> = (
  phenotypes: readonly Phenotype<TGenotype>[],
  fitnessFunction: FitnessFunction<TGenotype>,
) => Phenotype<TGenotype>;

export type FitnessFunction<TGenotype extends Genotype> = (
  phenotype: Phenotype<TGenotype>,
) => number;

export type CrossoverOperator<TGenotype extends Genotype> = (
  phenotypeA: Phenotype<TGenotype>,
  phenotypeB: Phenotype<TGenotype>,
) => Phenotype<TGenotype>;

export type MutationOperator<TGenotype extends Genotype> = (
  phenotype: Phenotype<TGenotype>,
  genotype: TGenotype,
) => Phenotype<TGenotype>;
