import { faker } from '@faker-js/faker'
import { AcceptedDateFormats } from '../../config/date-formats'
import { AcceptedDatetimeFormats } from '../../config/datetime-formats'
import {AcceptedNumberFormats} from '../../config/number-formats'
import dateString from './dateString'
import datetimeString from './datetimeString'
import formattedNumber from './formattedNumber'
import formattedString from './formattedString'
import getDateFormatFromDecorators from '../../helpers/getDateFormatFromDecorators'
import getDatetimeFormatFromDecorators from '../../helpers/getDatetimeFormatFromDecorators'
import getNumberFormatFromDecorators from '../../helpers/getNumberFormatFromDecorators'
import getStringFormatFromDecorators from '../../helpers/getStringFormatFromDecorators'
import parseDatatype from '../../helpers/parseDatatype'
import { ApiContractOptions } from '../../config'

export default function generateResponse(
  payloadShape: { [key: string]: any },
  options: ApiContractOptions={},
 ) {
  const results: { [key: string]: any } = {}

  Object.keys(payloadShape).forEach(key => {
    if (typeof payloadShape[key] === 'object') {
      results[key] = generateResponse(payloadShape[key], options)

    } else {
      const val = generateValue(payloadShape[key], options)
      if (val === null) throw `unrecognized format passed for payload key: ${key}. Invalid format is: ${payloadShape[key]}`
      results[key] = val
    }
  })
  return results
}

function generateValue(format: string, options: ApiContractOptions={}) {
  const [datatype, _decorators, isArray] = parseDatatype(format)
  let decorators = _decorators as string[]

  switch(datatype) {
  case 'string':
    if (decorators.length) {
      const strFormat = getStringFormatFromDecorators(decorators)
      if (!strFormat) throw `Unrecognized string format: ${strFormat}`

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
          formattedNumber(AcceptedNumberFormats.Int),
          formattedNumber(AcceptedNumberFormats.Int),
        ] :
        formattedNumber(AcceptedNumberFormats.Int)
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
    const { serializers } = options
    if (serializers && serializers[datatype as string]) {
      const registeredSerializer = serializers[datatype as string]
      return isArray ?
        [
          generateResponse(registeredSerializer, options),
          generateResponse(registeredSerializer, options),
        ] :
        generateResponse(registeredSerializer, options)
    }
    return null
  }
}
