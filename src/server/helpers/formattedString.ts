import { faker } from '@faker-js/faker'
import { AcceptedStringFormats } from '../../config/formats/string'

export default function formattedString(format: AcceptedStringFormats | null) {
  switch(format) {
  case AcceptedStringFormats.UUID:
    return faker.datatype.uuid()

  case AcceptedStringFormats.Email:
    return faker.internet.email()

  case AcceptedStringFormats.Name:
    return faker.name.firstName()

  case AcceptedStringFormats.FullName:
    return faker.name.fullName()

  default:
    return faker.lorem.word()
  }
}
