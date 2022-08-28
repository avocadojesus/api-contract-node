import { faker } from '@faker-js/faker'
import { AcceptedDateFormats } from '../../config/formats/date'
import { AcceptedDatetimeFormats } from '../../config/formats/datetime'
import { AcceptedNumberFormats } from '../../config/formats/number'
import dateString from './dateString'
import datetimeString from './datetimeString'
import formattedNumber from './formattedNumber'
import formattedString from './formattedString'
import getDateFormatFromDecorators from '../../helpers/getDateFormatFromDecorators'
import getDatetimeFormatFromDecorators from '../../helpers/getDatetimeFormatFromDecorators'
import getNumberFormatFromDecorators from '../../helpers/getNumberFormatFromDecorators'
import getStringFormatFromDecorators from '../../helpers/getStringFormatFromDecorators'
import parseDatatype from '../../helpers/parseDatatype'
import { InvalidFormat } from '../../exceptions/invalid-format'
import { ApiContractOptions, PrimaryDatatype } from '../../config'

export default function generateResponse(
  payloadShape: { [key: string]: any },
  options: ApiContractOptions={},
 ) {
  const results: { [key: string]: any } = {}

  Object.keys(payloadShape).forEach(key => {
    if (payloadShape[key] && typeof payloadShape[key] === 'object') {
      results[key] = generateResponse(payloadShape[key], options)

    } else {
      const val = generateValue(payloadShape[key], options)
      if (val === null) throw new InvalidFormat(key, payloadShape[key])
      results[key] = val
    }
  })
  return results
}

function generateValue(format: string, options: ApiContractOptions={}) {
  const { datatype, decorators, isArray, isOptional } = parseDatatype(format)

  switch(datatype) {
  case PrimaryDatatype.String:
    const strFormat = getStringFormatFromDecorators(decorators)
    return isArray ? [ formattedString(strFormat), formattedString(strFormat) ] : formattedString(strFormat)

  case PrimaryDatatype.Number:
    const numFormat = getNumberFormatFromDecorators(decorators)
    return isArray ? [ formattedNumber(numFormat), formattedNumber(numFormat) ] : formattedNumber(numFormat)

  case PrimaryDatatype.Bool:
    return isArray ?
      [
        faker.datatype.boolean(),
        faker.datatype.boolean()
      ] :
      faker.datatype.boolean()

  case PrimaryDatatype.Date:
    const dateFormat = getDateFormatFromDecorators(decorators)
    return isArray ? [ dateString(dateFormat), dateString(dateFormat) ] : dateString(dateFormat)

  case PrimaryDatatype.Datetime:
    const datetimeFormat = getDatetimeFormatFromDecorators(decorators)
    return isArray ? [ datetimeString(datetimeFormat), datetimeString(datetimeFormat) ] : datetimeString(datetimeFormat)

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
