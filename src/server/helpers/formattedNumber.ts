import {faker} from '@faker-js/faker'
import { AcceptedNumberFormats } from '../../config/number-formats'

export default function formattedNumber(format: AcceptedNumberFormats) {
  switch(format) {
  case AcceptedNumberFormats.Float:
    return faker.datatype.float({ precision: 0.01 })

  case AcceptedNumberFormats.Int:
    return parseInt(faker.datatype.bigInt({ max: 20000 }).toString())

  case AcceptedNumberFormats.BigInt:
    return parseInt(faker.datatype.bigInt().toString())

  default:
    throw `Unrecognized number format: ${format}`
  }
}
