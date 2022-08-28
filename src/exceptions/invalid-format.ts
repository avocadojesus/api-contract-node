import { PrimaryDatatype } from '../config'

export class InvalidFormat extends Error {
  private receivedFormat: any
  private key: string

  constructor(key: string, receivedFormat: any) {
    super()
    this.receivedFormat = receivedFormat
    this.key = key
  }

  get message() {
    return `
      unrecognized format passed for payload key:
        '${this.key}'

      The format we received from you is:
        '${this.receivedFormat}'.

      The allowed datatypes are:
        '${Object.values(PrimaryDatatype).join(', ')}'
    `
  }
}
