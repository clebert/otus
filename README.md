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
