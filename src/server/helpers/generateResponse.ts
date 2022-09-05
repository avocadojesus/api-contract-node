import { faker } from '@faker-js/faker'
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
  routeParams: { [key: string]: any }={}
 ) {
  const results: { [key: string]: any } = {}

  Object.keys(payloadShape).forEach(key => {
    if (payloadShape[key] && typeof payloadShape[key] === 'object') {
      results[key] = generateResponse(payloadShape[key], options, routeParams)

    } else if (routeParams[key] !== undefined) {
      results[key] = routeParams[key]

    } else {
      const val = generateValue(payloadShape[key], options, routeParams)
      if (val === null) throw new InvalidFormat(key, payloadShape[key])
      results[key] = val
    }
  })

//   Object.keys(routeParams).forEach(key => {
//     if (typeof results[key] !== 'undefined')
//       results[key] = routeParams[key]
//   })

  return results
}

function generateValue(format: string, options: ApiContractOptions={}, routeParams: { [key: string]: any }={}) {
  const { datatype, decorators, isArray } = parseDatatype(format)

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
          generateResponse(registeredSerializer, options, routeParams),
          generateResponse(registeredSerializer, options, routeParams),
        ] :
        generateResponse(registeredSerializer, options, routeParams)
    }
    return null
  }
}
