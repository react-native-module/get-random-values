// https://github.com/KenanY/get-random-values/blob/master/test/index.js
import isFunction from 'lodash.isfunction'
import isBrowser from 'is-browser'
import getRandomValues from '../src/index'
import { QuotaExceededErrorMessage } from '../src/errors'

test('exports a function', function () {
  expect.assertions(1)
  expect(isFunction(getRandomValues)).toBeTruthy()
})

test('does not cast buffer', function () {
  const TYPES = isBrowser
    ? [
        Uint8Array,
        Int8Array,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array
      ]
    : [Uint8Array]

  expect.assertions(TYPES.length * 3)

  TYPES.forEach(Type => {
    const buf = new Type(8)
    expect(function () {
      getRandomValues(buf)
    }).not.toThrow()
    expect(buf.constructor).toBe(Type)
    expect(buf.length).toBe(8)
  })
})

test('throws on length >65536', function () {
  expect.assertions(1)
  expect(function () {
    getRandomValues(new Uint8Array(65537))
  })
    .toThrowError(QuotaExceededErrorMessage)
})

test('returns argument', function () {
  expect.assertions(1)
  const argument = new Uint8Array(1024)
  expect(getRandomValues(argument)).toBe(argument)
})

test('not edit argument array size', function () {
  expect.assertions(2)
  const paramArray = new Uint8Array(2)
  expect(function () {
    getRandomValues(paramArray)
  }).not.toThrow()
  expect(paramArray.length).toEqual(2)
})
