export function getRandomValues (array) {
  // If you're running react-native debug mode (Chrome debug)
  // calling request is replaced globalThis.crypto.getRandomValues
  // If you ignore this, you may get error on getRandomBase64
  if (globalThis.crypto) {
    if (globalThis.crypto.getRandomValues) {
      return globalThis.crypto.getRandomValues(array)
    }
  }

  const { QuotaExceededError, TypeMismatchError } = require('./src/errors')
  const { getRandomBase64 } = require('./src/lib')
  const base64Decode = require('fast-base64-decode')

  if (!(array instanceof Int8Array || array instanceof Uint8Array || array instanceof Int16Array || array instanceof Uint16Array || array instanceof Int32Array || array instanceof Uint32Array || array instanceof Uint8ClampedArray)) {
    throw new TypeMismatchError('Expected an integer array')
  }

  if (array.byteLength > 65536) {
    throw new QuotaExceededError('Can only request a maximum of 65536 bytes')
  }

  base64Decode(getRandomBase64(array.byteLength), new Uint8Array(array.buffer, array.byteOffset, array.byteLength))

  return array
}

export default getRandomValues
