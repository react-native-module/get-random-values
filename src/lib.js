const { NativeModules } = require('react-native')

/**
 * @param {number} byteLength
 * @returns {string}
 */
export function getRandomBase64 (byteLength) {
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
