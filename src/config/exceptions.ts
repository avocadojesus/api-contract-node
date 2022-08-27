import { PrimaryDatatype } from '../config'

class UnrecognizedFormat extends Error {
  receivedFormat: any

  constructor(receivedFormat: any) {
    super(receivedFormat)
    this.receivedFormat = receivedFormat
  }

  get expectedType(): PrimaryDatatype {
    throw 'Define on children'
  }

  get message() {
    return `Unrecognized ${this.expectedType} format:`
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

