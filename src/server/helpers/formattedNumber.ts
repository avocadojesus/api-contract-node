import {faker} from '@faker-js/faker'
import { AcceptedNumberFormats } from '../../config/formats/number'

export default function formattedNumber(format: AcceptedNumberFormats | null) {
  switch(format) {
  case AcceptedNumberFormats.Float:
    return faker.datatype.float({ precision: 0.01 })

  case AcceptedNumberFormats.BigInt:
    return parseInt(faker.datatype.bigInt().toString())

  case AcceptedNumberFormats.Int:
  default:
    return parseInt(faker.datatype.bigInt({ max: 20000 }).toString())
  }
}
