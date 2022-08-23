import { faker } from '@faker-js/faker'
import { AcceptedDateFormats } from '../config/date-formats'
import { AcceptedDatetimeFormats } from '../config/datetime-formats'
import {AcceptedNumberFormats} from '../config/number-formats'
import dateString from './dateString'
import datetimeString from './datetimeString'
import formattedNumber from './formattedNumber'
import formattedString from './formattedString'
import getDateFormatFromDecorators from './getDateFormatFromDecorators'
import getDatetimeFormatFromDecorators from './getDatetimeFormatFromDecorators'
import getNumberFormatFromDecorators from './getNumberFormatFromDecorators'
import getStringFormatFromDecorators from './getStringFormatFromDecorators'
import parseDatatype from './parseDatatype'

export default function generateValue(format: string) {
  const [datatype, _decorators, isArray] = parseDatatype(format)
  let decorators = _decorators as string[]

  switch(datatype) {
  case 'string':
    if (decorators.length) {
      const strFormat = getStringFormatFromDecorators(decorators)
      if (!strFormat) throw `Unrecognized date format: ${strFormat}`

      return isArray ? [ formattedString(strFormat), formattedString(strFormat) ] : formattedString(strFormat)

    } else {
      return isArray ?
        [
          faker.lorem.word(),
          faker.lorem.word(),
        ] :
        faker.lorem.word()
    }

  case 'number':
    if (decorators.length) {
      const numFormat = getNumberFormatFromDecorators(decorators)
      if (!numFormat) throw `Unrecognized number format: ${numFormat}`

      return isArray ? [ formattedNumber(numFormat), formattedNumber(numFormat) ] : formattedNumber(numFormat)

    } else {
      return isArray ?
        [
          formattedNumber(AcceptedNumberFormats.BigInt),
          formattedNumber(AcceptedNumberFormats.BigInt),
        ] :
        formattedNumber(AcceptedNumberFormats.BigInt)
    }

  case 'bool':
    return isArray ?
      [
        faker.datatype.boolean(),
        faker.datatype.boolean()
      ] :
      faker.datatype.boolean()

  case 'date':
    if (decorators.length) {
      const dateFormat = getDateFormatFromDecorators(decorators)
      if (!dateFormat) throw `Unrecognized date format: ${dateFormat}`

      return isArray ? [ dateString(dateFormat), dateString(dateFormat) ] : dateString(dateFormat)

    } else {
      return isArray ?
        [
          dateString(AcceptedDateFormats.YYYYMMDD),
          dateString(AcceptedDateFormats.YYYYMMDD),
        ] :
        dateString(AcceptedDateFormats.YYYYMMDD)
    }

  case 'datetime':
    if (decorators.length) {
      const datetimeFormat = getDatetimeFormatFromDecorators(decorators)
      if (!datetimeFormat) throw `Unrecognized datetime format: ${datetimeFormat}`

      return isArray ? [ datetimeString(datetimeFormat), datetimeString(datetimeFormat) ] : datetimeString(datetimeFormat)

    } else {
      return isArray ?
        [
          datetimeString(AcceptedDatetimeFormats.ISO861),
          datetimeString(AcceptedDatetimeFormats.ISO861),
        ] :
        datetimeString(AcceptedDatetimeFormats.ISO861)
    }

  default:
    return null
  }
}
