import {faker} from '@faker-js/faker'
import { AcceptedNumberFormats } from '../config/number-formats'

export default function formattedNumber(format: AcceptedNumberFormats) {
  switch(format) {
  case AcceptedNumberFormats.Float:
    return faker.datatype.float({ precision: 0.01 })

  case AcceptedNumberFormats.BigInt:
    return parseInt(faker.datatype.bigInt().toString())

  default:
    throw `Unrecognized number format: ${format}`
  }
}
