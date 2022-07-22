// https://github.com/KenanY/get-random-values/blob/master/test/index.js
import test from 'tape'
import isFunction from 'lodash.isfunction'
import forEach from 'lodash.foreach'
import isBrowser from 'is-browser'

import getRandomValues from '../src/index'

test('exports a function', function (t) {
  t.plan(1)
  t.ok(isFunction(getRandomValues))
})

test('does not cast buffer', function (t) {
  const TYPES = [
    Uint8Array
  ]

  if (isBrowser) {
    Array.prototype.push.apply(TYPES, [
      Int8Array,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array
    ])
  }

  t.plan(TYPES.length * 3)

  forEach(TYPES, function (Type) {
    const buf = new Type(8)
    t.doesNotThrow(function () {
      getRandomValues(buf)
    })
    t.equal(buf.constructor, Type)
    t.equal(buf.length, 8)
  })
})

test('throws on length >65536', function (t) {
  t.plan(1)
  t.throws(function () {
    getRandomValues(new Uint8Array(65537))
  }, /QuotaExceededError/)
})

test('returns argument', function (t) {
  t.plan(1)
  const argument = new Uint8Array(1024)
  t.equal(getRandomValues(argument), argument)
})
