import {faker} from '@faker-js/faker'
import { AcceptedStringFormats } from '../config/string-formats'

export default function formattedString(format: AcceptedStringFormats) {
  switch(format) {
  case 'uuid':
    return faker.datatype.uuid()

  case 'email':
    return faker.internet.email()

  case 'name':
    return faker.name.firstName()

  case 'fullname':
    return faker.name.fullName()

  default:
    throw `Unable to format string due to unrecognized format: ${format}`
  }
}
