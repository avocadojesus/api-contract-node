import { faker } from '@faker-js/faker'
import dateString from './dateString'
import datetimeString from './datetimeString'
import formattedNumber from './formattedNumber'
import formattedString from './formattedString'
import getDateFormatFromDecorators from '../../helpers/getDateFormatFromDecorators'
import getDatetimeFormatFromDecorators from '../../helpers/getDatetimeFormatFromDecorators'
import getNumberFormatFromDecorators from '../../helpers/getNumberFormatFromDecorators'
import getStringFormatFromDecorators from '../../helpers/getStringFormatFromDecorators'
import getEnumValuesFromDecorators from '../../helpers/getEnumValuesFromDecorators'
import parseDatatype from '../../helpers/parseDatatype'
import { InvalidFormat } from '../../exceptions/invalid-format'
import { ApiContractOptions, PrimaryDatatype } from '../../config'
import getCountFromDecorators from '../../helpers/getCountFromDecorators'

export default function generateResponse(
  endpointKey: string,
  payloadShape: { [key: string]: any },
  options: ApiContractOptions={},
  routeParams: { [key: string]: any }={}
 ) {
  const results: { [key: string]: any } = {}

  Object.keys(payloadShape).forEach(key => {
    if (payloadShape[key] && typeof payloadShape[key] === 'object') {
      results[key] = generateResponse(endpointKey, payloadShape[key], options, routeParams)

    } else if (routeParams[key] !== undefined) {
      results[key] = routeParams[key]

    } else {
      const val = generateValue(endpointKey, payloadShape[key], options, routeParams)
      if (val === null) throw new InvalidFormat(key, payloadShape[key])
      results[key] = val
    }
  })

  const mocks = JSON.parse(process.env.API_CONTRACT_MOCKS || '{}')
  if (mocks[endpointKey])
    return {
      ...results,
      ...mocks[endpointKey],
    }

  return results
}

function generateValue(endpointKey: string, format: string, options: ApiContractOptions={}, routeParams: { [key: string]: any }={}) {
  const { datatype, decorators, isArray } = parseDatatype(format)
  const count = getCountFromDecorators(decorators)
  const countArray = [...Array(count).keys()]

  switch(datatype) {
  case PrimaryDatatype.String:
    const strFormat = getStringFormatFromDecorators(decorators)
    const enums = getEnumValuesFromDecorators(decorators)
    return isArray ?
      countArray.map(() => formattedString(strFormat, enums)) :
      formattedString(strFormat, enums)

  case PrimaryDatatype.Number:
    const numFormat = getNumberFormatFromDecorators(decorators)
    return isArray ?
      countArray.map(() => formattedNumber(numFormat)) :
      formattedNumber(numFormat)

  case PrimaryDatatype.Bool:
    return isArray ?
      countArray.map(() => faker.datatype.boolean()) :
      faker.datatype.boolean()

  case PrimaryDatatype.Date:
    const dateFormat = getDateFormatFromDecorators(decorators)
    return isArray ?
      countArray.map(() => dateString(dateFormat)) :
      dateString(dateFormat)

  case PrimaryDatatype.Datetime:
    const datetimeFormat = getDatetimeFormatFromDecorators(decorators)
    return isArray ?
      countArray.map(() => datetimeString(datetimeFormat)) :
      datetimeString(datetimeFormat)

  default:
    const { serializers } = options
    if (serializers && serializers[datatype as string]) {
      const registeredSerializer = serializers[datatype as string]
      return isArray ?
        countArray.map(() => generateResponse(endpointKey, registeredSerializer, options, routeParams)) :
        generateResponse(endpointKey, registeredSerializer, options, routeParams)
    }
    return null
  }
}
