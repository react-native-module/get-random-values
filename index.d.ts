// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
export type AllowedArrays = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray
// Web API Same
export default function getRandomValues<T extends ArrayBufferView | null>(array: T): T;