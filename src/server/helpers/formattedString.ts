import { faker } from '@faker-js/faker'
import { AcceptedStringFormats } from '../../config/formats/string'
import { ENUM_REGEX } from '../../config/formats/enum'
import random from '../../helpers/random'

export default function formattedString(format: AcceptedStringFormats | null, enums: string[]=[]) {
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
    if (ENUM_REGEX.test(format || '')) {
      return enums[random(0, enums.length - 1)]
    } else {
      return faker.lorem.word()
    }
  }
}
