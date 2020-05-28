# Otus

[![][ci-badge]][ci-link] [![][version-badge]][version-link]
[![][license-badge]][license-link] [![][types-badge]][types-link]
[![][size-badge]][size-link]

[ci-badge]: https://github.com/clebert/otus/workflows/CI/badge.svg
[ci-link]: https://github.com/clebert/otus
[version-badge]: https://badgen.net/npm/v/otus
[version-link]: https://www.npmjs.com/package/otus
[license-badge]: https://badgen.net/npm/license/otus
[license-link]: https://github.com/clebert/otus/blob/master/LICENSE
[types-badge]: https://badgen.net/npm/types/otus
[types-link]: https://github.com/clebert/otus
[size-badge]: https://badgen.net/bundlephobia/minzip/otus
[size-link]: https://bundlephobia.com/result?p=otus

A modular JavaScript API for working with
[genetic algorithms](https://en.wikipedia.org/wiki/Genetic_algorithm).

## Installation

Using `yarn`:

```
yarn add otus
```

Using `npm`:

```
npm install otus --save
```

## Features

- Support for three modular exchangeable
  [genetic operators](https://en.wikipedia.org/wiki/Genetic_operator)
  (selection, crossover, mutation)
- A ready-to-use implementation of each of the supported genetic operators:
  - [Fitness proportionate selection](https://en.wikipedia.org/wiki/Fitness_proportionate_selection)
    (via [stochastic acceptance](https://arxiv.org/abs/1109.3627))
  - [Uniform crossover](<https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)#Uniform_crossover>)
  - [Uniform mutation](<https://en.wikipedia.org/wiki/Mutation_(genetic_algorithm)>)
- [Genetic representation](https://en.wikipedia.org/wiki/Genetic_representation)
  using plain JavaScript objects
- Support for [elitism](https://en.wikipedia.org/wiki/Genetic_algorithm#Elitism)
- Support for adaptive parameters
  ([adaptive genetic algorithms](https://en.wikipedia.org/wiki/Genetic_algorithm#Adaptive_GAs))
- Immutable/functional API
- Built-in support for TypeScript

## Terminology

### [Genotype](https://en.wikipedia.org/wiki/Genotype)

The genotype defines all genes and their possible values using alleles. It is so
to speak the blueprint for the construction of phenotypes.

<details>
  <summary>Type definition</summary>

```ts
interface Genotype {
  readonly [geneName: string]: Allele<any>;
}
```

</details>

### [Allele](https://en.wikipedia.org/wiki/Allele)

The possible values of a particular gene are called alleles. An allele is a
function with which the initial value of a gene is generated as well as all
further values of a gene in the course of mutations.

<details>
  <summary>Type definition</summary>

```ts
type Allele<TValue> = () => TValue;
```

</details>

### [Phenotype](https://en.wikipedia.org/wiki/Phenotype)

The phenotype represents a
[candidate solution](https://en.wikipedia.org/wiki/Feasible_region#Candidate_solution)
and contains all genes defined by the genotype with concrete values.

<details>
  <summary>Type definition</summary>

```ts
type Phenotype<TGenotype extends Genotype> = {
  readonly [TGeneName in keyof TGenotype]: Gene<TGenotype, TGeneName>;
};
```

</details>

### [Gene](https://en.wikipedia.org/wiki/Gene)

A gene represents a concrete property of a solution which can be mutated and
altered.

<details>
  <summary>Type definition</summary>

```ts
type Gene<
  TGenotype extends Genotype,
  TGeneName extends keyof TGenotype
> = ReturnType<TGenotype[TGeneName]>;
```

</details>

### [Selection operator](<https://en.wikipedia.org/wiki/Selection_(genetic_algorithm)>)

The selection operator is used to select individual solutions from a population
for later breeding (using the crossover operator). The selection is usually
based on the fitness of each individual, which is determined by a fitness
function.

<details>
  <summary>Type definition</summary>

```ts
type SelectionOperator<TGenotype extends Genotype> = (
  phenotypes: readonly Phenotype<TGenotype>[],
  fitnessFunction: FitnessFunction<TGenotype>
) => Phenotype<TGenotype>;
```

</details>

### [Fitness function](https://en.wikipedia.org/wiki/Fitness_function)

A fitness function is a particular type of
[objective function](https://en.wikipedia.org/wiki/Loss_function) that is used
to summarise, as a single figure of merit, how close a given solution is to
achieving the set aims.

<details>
  <summary>Type definition</summary>

```ts
type FitnessFunction<TGenotype extends Genotype> = (
  phenotype: Phenotype<TGenotype>
) => number;
```

</details>

### [Crossover operator](<https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)>)

The crossover operator is used in the process of taking two parent solutions and
producing a child solution from them. By recombining portions of good solutions,
the genetic algorithm is more likely to create a better solution.

<details>
  <summary>Type definition</summary>

```ts
type CrossoverOperator<TGenotype extends Genotype> = (
  phenotypeA: Phenotype<TGenotype>,
  phenotypeB: Phenotype<TGenotype>
) => Phenotype<TGenotype>;
```

</details>

### [Mutation operator](<https://en.wikipedia.org/wiki/Mutation_(genetic_algorithm)>)

The mutation operator encourages genetic diversity amongst solutions and
attempts to prevent the genetic algorithm converging to a local minimum by
stopping the solutions becoming too close to one another.

<details>
  <summary>Type definition</summary>

```ts
type MutationOperator<TGenotype extends Genotype> = (
  phenotype: Phenotype<TGenotype>,
  genotype: TGenotype
) => Phenotype<TGenotype>;
```

</details>

## Usage example

```js
import * as otus from 'otus';
```

```js
const smallNumberGenotype = {
  base: otus.createFloatAllele(1, 10), // float between 1.0 (inclusive) and 10.0 (exclusive)
  exponent: otus.createIntegerAllele(2, 4), // integer between 2 (inclusive) and 4 (inclusive)
};
```

```js
function isAnswerToEverything(smallNumberPhenotype) {
  const number = Math.pow(
    smallNumberPhenotype.base,
    smallNumberPhenotype.exponent
  );

  return number === 42 ? Number.MAX_SAFE_INTEGER : 1 / Math.abs(42 - number);
}
```

```js
let state = {
  genotype: smallNumberGenotype,
  phenotypes: [],
  populationSize: 1000,
  elitePopulationSize: 1,
  fitnessFunction: otus.cacheFitnessFunction(isAnswerToEverything),
  selectionOperator: otus.createFitnessProportionateSelectionOperator(),
  crossoverOperator: otus.createUniformCrossoverOperator(0.5),
  mutationOperator: otus.createUniformMutationOperator(0.1),
};
```

```js
for (let i = 0; i < 100; i += 1) {
  state = otus.geneticAlgorithm(state);
}
```

```js
const answerToEverythingPhenotype = otus.getFittestPhenotype(state);
```

```js
console.log(
  'The answer to everything:',
  Math.pow(
    answerToEverythingPhenotype.base,
    answerToEverythingPhenotype.exponent
  ),
  answerToEverythingPhenotype
);
```

```
The answer to everything: 42.00057578051458 { base: 3.4760425291663264, exponent: 3 }
```

## API reference

### Genetic algorithm function

```ts
function geneticAlgorithm<TGenotype extends Genotype>(
  state: GeneticAlgorithmState<TGenotype>
): GeneticAlgorithmState<TGenotype>;
```

```ts
interface GeneticAlgorithmState<TGenotype extends Genotype> {
  readonly genotype: TGenotype;
  readonly phenotypes: readonly Phenotype<TGenotype>[];
  readonly populationSize: number;
  readonly elitePopulationSize?: number;
  readonly fitnessFunction: FitnessFunction<TGenotype>;
  readonly selectionOperator: SelectionOperator<TGenotype>;
  readonly crossoverOperator: CrossoverOperator<TGenotype>;
  readonly mutationOperator: MutationOperator<TGenotype>;
}
```

### Genetic operator factory functions

```ts
function createFitnessProportionateSelectionOperator<
  TGenotype extends Genotype
>(randomFunction?: () => number): SelectionOperator<TGenotype>;
```

```ts
function createUniformCrossoverOperator<TGenotype extends Genotype>(
  probability: number,
  randomFunction?: () => number
): CrossoverOperator<TGenotype>;
```

```ts
function createUniformMutationOperator<TGenotype extends Genotype>(
  probability: number,
  randomFunction?: () => number
): MutationOperator<TGenotype>;
```

### Allele factory functions

```ts
function createFloatAllele(
  min: number,
  max: number,
  randomFunction?: () => number
): Allele<number>;
```

> The created allele returns a random float between min (inclusive) and max
> (exclusive).

```ts
function createIntegerAllele(
  min: number,
  max: number,
  randomFunction?: () => number
): Allele<number>;
```

> The created allele returns a random integer between min (inclusive) and max
> (inclusive).

### Utility functions

```ts
function getFittestPhenotype<TGenotype extends Genotype>(
  state: GeneticAlgorithmState<TGenotype>
): Phenotype<TGenotype> | undefined;
```

```ts
function cacheFitnessFunction<TGenotype extends Genotype>(
  fitnessFunction: FitnessFunction<TGenotype>
): FitnessFunction<TGenotype>;
```

```ts
function createRandomPhenotype<TGenotype extends Genotype>(
  genotype: TGenotype
): Phenotype<TGenotype>;
```

## Development

### Publishing a new release

```
yarn release patch
```

```
yarn release minor
```

```
yarn release major
```

After a new release has been created by pushing the tag, it must be published
via the GitHub UI. This triggers the final publication to npm.

---

Copyright (c) 2020, Clemens Akens. Released under the terms of the
[MIT License](https://github.com/clebert/otus/blob/master/LICENSE).
