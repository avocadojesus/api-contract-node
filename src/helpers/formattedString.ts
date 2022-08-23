import {faker} from '@faker-js/faker'
import { AcceptedStringFormats } from '../config/string-formats'

export default function formattedString(format: AcceptedStringFormats) {
  switch(format) {
  case 'email':
    return faker.internet.email()

  case 'name':
    return faker.name.firstName()

  case 'fullname':
    return faker.name.fullName()

  default:
    throw `Unrecognized string format: ${format}`
  }
}
