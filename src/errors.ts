export class TypeMismatchError extends Error {}
export class QuotaExceededError extends Error {
  constructor () {
    super(QuotaExceededErrorMessage)
  }
}
export const QuotaExceededErrorMessage = 'Can only request a maximum of 65536 bytes'
