import base64Decode from 'fast-base64-decode'
import { QuotaExceededError, TypeMismatchError } from './errors'
import { getRandomBase64 } from './lib'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
export type AllowedArrays = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray
// Web API Same
export function getRandomValues<T extends ArrayBufferView | null> (array: T): T { // s
  // For web
  // If you're running react-native debug mode (Chrome debug)
  // calling request is replaced globalThis.crypto.getRandomValues
  // If you ignore this, you may get error on getRandomBase64
  if (globalThis.crypto) {
    if (globalThis.crypto.getRandomValues) {
      return globalThis.crypto.getRandomValues(array)
    }
  }

  if (!(array instanceof Int8Array || array instanceof Uint8Array || array instanceof Int16Array || array instanceof Uint16Array || array instanceof Int32Array || array instanceof Uint32Array || array instanceof Uint8ClampedArray)) {
    throw new TypeMismatchError('Expected an integer array')
  }

  if (array.byteLength > 65536) {
    throw new QuotaExceededError('Can only request a maximum of 65536 bytes')
  }

  base64Decode(getRandomBase64(array.byteLength), new Uint8Array(array.buffer, array.byteOffset, array.byteLength))

  return array
}
