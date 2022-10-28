import { ApiContractOptions, PrimaryDatatype } from '../config'
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
import getEnumValuesFromDecorators from '../helpers/getEnumValuesFromDecorators'

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

      return validateValue(key, results[key], format, options)
    })

  return !values.includes(false)
}

// word to the wise -
// I continue to try to move validateValue to a separate file, only to remember
// that it calls `validate`, and moving it to another file would create a circular
// dependency. Really, it could be all consolidated into a singular function, `validate`,
// but I felt that this cluttered the ability to see what was happening on a high level
function validateValue(key: string, value: any, format: string, options: ApiContractOptions={}) {
  const { datatype, decorators, isArray, isOptional } = parseDatatype(format)
  if (!isArray && Array.isArray(value)) return false
  if (isArray && !Array.isArray(value)) return false
  if (isOptional && [null, undefined].includes(value)) return true

  switch(datatype) {
  case PrimaryDatatype.String:
    const strFormat = decorators.length ? getStringFormatFromDecorators(decorators) : null
    const enums = getEnumValuesFromDecorators(decorators)
    if (isArray) return !value.map((val: string) => validateString(val, strFormat, enums)).includes(false)
    return validateString(value, strFormat, enums)

  case PrimaryDatatype.Number:
    const numFormat = decorators.length ? getNumberFormatFromDecorators(decorators) : null
    if (isArray) return !value.map((val: string) => validateNumber(val, numFormat)).includes(false)
    return validateNumber(value, numFormat)

  case PrimaryDatatype.Bool:
    if (isArray) return !value.map((val: string) => validateBool(val, isOptional)).includes(false)
    return validateBool(value, isOptional)

  case PrimaryDatatype.Date:
    const dateFormat = decorators.length ? getDateFormatFromDecorators(decorators) : null
    if (isArray) return !value.map((val: string) => validateDate(key, val, dateFormat || AcceptedDateFormats.YYYYMMDD)).includes(false)
    return validateDate(key, value, dateFormat || AcceptedDateFormats.YYYYMMDD)

  case PrimaryDatatype.Datetime:
    const datetimeFormat = decorators.length ? getDatetimeFormatFromDecorators(decorators) : null
    if (isArray) return !value.map((val: string) => validateDatetime(key, val, datetimeFormat || AcceptedDatetimeFormats.ISO861)).includes(false)
    return validateDatetime(key, value, datetimeFormat || AcceptedDatetimeFormats.ISO861)

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

