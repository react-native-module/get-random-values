/**
 * @param {number} byteLength
 * @returns {string}
 */
function getRandomBase64 (byteLength) {
  // For running on Nodejs - testing, console etc.
  const isRunningOnReactNative = globalThis.navigator && globalThis.navigator.product && globalThis.navigator.product === 'ReactNative'
  if (!isRunningOnReactNative) {
    const crypto = require('crypto')
    if (crypto.webcrypto && crypto.webcrypto.getRandomValues) {
      return Buffer.from(crypto.webcrypto.getRandomValues(new Uint8Array(byteLength))).toString('base64')
    } else if (crypto.randomBytes) {
      return crypto.randomBytes(byteLength).toString('base64')
    }
  }

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
    throw new Error('Native module not found')
  }
}

module.exports = {
  getRandomBase64
}
