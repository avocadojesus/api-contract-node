import { PrimaryDatatype } from '../config'
import DefineOnChildren from './internal/define-on-children'

export class InvalidValue extends Error {
  private receivedFormat: any
  private key: string

  constructor(key: string, receivedFormat: any) {
    super()
    this.receivedFormat = receivedFormat
    this.key = key
  }

  get expectedType(): PrimaryDatatype {
    throw new DefineOnChildren(this.constructor.name, 'get expectedType')
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

export class InvalidDatetimeValue extends InvalidValue {
  get expectedType() {
    return PrimaryDatatype.Datetime
  }
}

export class InvalidDateValue extends InvalidValue {
  get expectedType() {
    return PrimaryDatatype.Date
  }
}

export class InvalidStringValue extends InvalidValue {
  get expectedType() {
    return PrimaryDatatype.String
  }
}

export class InvalidNumberValue extends InvalidValue {
  get expectedType() {
    return PrimaryDatatype.Number
  }
}

export class InvalidBoolValue extends InvalidValue {
  get expectedType() {
    return PrimaryDatatype.Bool
  }
}
