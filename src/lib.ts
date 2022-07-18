import { Environment } from '@react-native-module/utility'

export function getRandomBase64 (byteLength: number): string {
  // For running on Nodejs - testing, console etc.
  if (Environment !== 'NativeMobile') {
    try {
      if (Environment === 'Browser') {
        const crypto = globalThis.crypto
        if (Buffer && crypto.webcrypto && crypto.webcrypto.getRandomValues) {
          return Buffer.from(crypto.webcrypto.getRandomValues(new Uint8Array(byteLength))).toString('base64')
        }
      } else if (Environment === 'NodeJs') {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const crypto = require('node:crypto')
        return crypto.randomBytes(byteLength).toString('base64')
      }
    } catch (error) {
      // do nothing
    }
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { NativeModules } = require('react-native')
    if (NativeModules.RNGetRandomValues) {
      return NativeModules.RNGetRandomValues.getRandomBase64(byteLength)
    } else if (NativeModules.ExpoRandom) {
    // Expo SDK 41-44
      return NativeModules.ExpoRandom.getRandomBase64String(byteLength)
    } else if (global.ExpoModules) {
    // Expo SDK 45+
      return global.ExpoModules.ExpoRandom.getRandomBase64String(byteLength)
    } else {
      throw Error('Native module not found')
    }
  } catch (error) {
    throw Error('Native module not found')
  }
}
