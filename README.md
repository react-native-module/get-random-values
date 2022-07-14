# react-native-module/get-random-values

This module export a function `getRandomValues` only
with same API `crypto.getRandomValues`

# Why use this module not `react-native-get-random-values`

`react-native-get-random-values` is pollifill package,
but, this module add anything on global scope

## Installation

A typical workflow:

```
npm i --save @react-native-module/get-random-values
```

```
yarn add @react-native-module/get-random-values
```

## Usage

```js
import { getRandomValues } from "@react-native-module/get-random-values";

const randomValues = getRandomValues(new Uint8Array(4));
```

### `getRandomValues(typedArray)`

- `typedArray` - Is an integer-based TypedArray, that is an `Int8Array`, a `Uint8Array`, an `Int16Array`, a `Uint16Array`, an `Int32Array`, or a `Uint32Array`. All elements in the array are going to be overridden with random numbers.

Returns the typed array that was passed in.
