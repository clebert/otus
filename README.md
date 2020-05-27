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

A modular JavaScript API for working with genetic algorithms.

## Installation

Using `yarn`:

```
yarn add otus
```

Using `npm`:

```
npm install otus --save
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
