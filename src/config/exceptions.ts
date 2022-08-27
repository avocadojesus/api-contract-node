import { PrimaryDatatype } from '../config'

class UnrecognizedFormat extends Error {
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

export class UnrecognizedDatetimeFormat extends UnrecognizedFormat {
  get expectedType() {
    return PrimaryDatatype.Datetime
  }
}

export class UnrecognizedDateFormat extends UnrecognizedFormat {
  get expectedType() {
    return PrimaryDatatype.Date
  }
}

export class UnrecognizedStringFormat extends UnrecognizedFormat {
  get expectedType() {
    return PrimaryDatatype.String
  }
}

export class UnrecognizedNumberFormat extends UnrecognizedFormat {
  get expectedType() {
    return PrimaryDatatype.String
  }
}

export class UnrecognizedBoolFormat extends UnrecognizedFormat {
  get expectedType() {
    return PrimaryDatatype.String
  }
}

