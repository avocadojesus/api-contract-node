import { PrimaryDatatype } from '../config'

class InvalidFormat extends Error {
  private receivedFormat: any
  private key: string

  constructor(key: string, receivedFormat: any) {
    super()
    this.receivedFormat = receivedFormat
    this.key = key
  }

  get expectedType(): PrimaryDatatype {
    throw 'Define on children'
  }

  get message() {
    return `
      unrecognized format passed for payload key:
        '${this.key}'

      The format we received from you is:
        '${this.receivedFormat}'.

      The expected format was:
        '${this.expectedType}'
    `
  }
}

export class InvalidDatetimeValue extends InvalidFormat {
  get expectedType() {
    return PrimaryDatatype.Datetime
  }
}

export class InvalidDateValue extends InvalidFormat {
  get expectedType() {
    return PrimaryDatatype.Date
  }
}

export class InvalidStringValue extends InvalidFormat {
  get expectedType() {
    return PrimaryDatatype.String
  }
}

export class InvalidNumberValue extends InvalidFormat {
  get expectedType() {
    return PrimaryDatatype.Number
  }
}

export class InvalidBoolValue extends InvalidFormat {
  get expectedType() {
    return PrimaryDatatype.Bool
  }
}
