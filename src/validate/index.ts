import { ApiContractOptions } from '../config'
import parseDatatype from '../helpers/parseDatatype'
import getStringFormatFromDecorators from '../helpers/getStringFormatFromDecorators'
import getDateFormatFromDecorators from '../helpers/getDateFormatFromDecorators'
import getDatetimeFormatFromDecorators from '../helpers/getDatetimeFormatFromDecorators'
import getNumberFormatFromDecorators from '../helpers/getNumberFormatFromDecorators'
import validateString from './helpers/validateString'
import validateBool from './helpers/validateBool'
import validateDate from './helpers/validateDate'
import validateDatetime from './helpers/validateDatetime'
import validateNumber from './helpers/validateNumber'
import { AcceptedDateFormats } from '../config/formats/date'
import { AcceptedDatetimeFormats } from '../config/formats/datetime'

export default function validate(
  results: { [key: string]: any },
  payloadShape: { [key: string]: any },
  options: ApiContractOptions = {}
): boolean {
  const values = Object
    .keys(payloadShape)
    .map(key => {
      const format = payloadShape[key]
      if (typeof format === 'object')
        return validate(results[key], payloadShape[key], options)

      return validateValue(results[key], format, options)
    })

  return !values.includes(false)
}

function validateValue(value: any, format: string, options: ApiContractOptions={}) {
  const [datatype, _decorators, isArray, isOptional] = parseDatatype(format)
  let decorators = _decorators as string[]
  if (!isArray && Array.isArray(value)) return false
  if (isArray && !Array.isArray(value)) return false
  if (isOptional && [null, undefined].includes(value)) return true

  switch(datatype) {
  case 'string':
    const strFormat = decorators.length ? getStringFormatFromDecorators(decorators) : null
    if (isArray) return !value.map((val: string) => validateString(val, strFormat)).includes(false)
    return validateString(value, strFormat)

  case 'number':
    const numFormat = decorators.length ? getNumberFormatFromDecorators(decorators) : null
    if (isArray) return !value.map((val: string) => validateNumber(val, numFormat)).includes(false)
    return validateNumber(value, numFormat)

  case 'bool':
    if (isArray) return !value.map((val: string) => validateBool(val, isOptional)).includes(false)
    return validateBool(value, isOptional)

  case 'date':
    const dateFormat = decorators.length ? getDateFormatFromDecorators(decorators) : null
    if (isArray) return !value.map((val: string) => validateDate(val, dateFormat || AcceptedDateFormats.YYYYMMDD)).includes(false)
    return validateDate(value, dateFormat || AcceptedDateFormats.YYYYMMDD)

  case 'datetime':
    const datetimeFormat = decorators.length ? getDatetimeFormatFromDecorators(decorators) : null
    if (isArray) return !value.map((val: string) => validateDatetime(val, datetimeFormat || AcceptedDatetimeFormats.ISO861)).includes(false)
    return validateDatetime(value, datetimeFormat || AcceptedDatetimeFormats.ISO861)

  default:
    const { serializers } = options
    if (serializers && serializers[datatype as string]) {
      const registeredSerializer = serializers[datatype as string]
      if (isArray) return !value.map((val: any) => validate(val, registeredSerializer, options)).includes(false)
      return validate(value, registeredSerializer, options)
    }
    return false
  }
}

