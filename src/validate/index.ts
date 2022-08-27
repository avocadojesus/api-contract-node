import { ApiContractOptions } from '../config'
import getDateFormatFromDecorators from '../helpers/getDateFormatFromDecorators'
import getDatetimeFormatFromDecorators from '../helpers/getDatetimeFormatFromDecorators'
import getNumberFormatFromDecorators from '../helpers/getNumberFormatFromDecorators'
import getStringFormatFromDecorators from '../helpers/getStringFormatFromDecorators'
import parseDatatype from '../helpers/parseDatatype'
import { DATETIME_FORMATS, AcceptedDatetimeFormats } from '../config/datetime-formats'
import { AcceptedDateFormats, DATE_FORMATS } from '../config/date-formats'
import { UUID_REGEX, NAME_REGEX, EMAIL_REGEX, FULL_NAME_REGEX } from '../config/regexes'

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

function validateString(value: any, format: string | null) {
  if (Array.isArray(value)) return false
  if (!value || typeof value === 'boolean') return false

  switch(format) {
  case 'uuid':
    return UUID_REGEX.test(value)

  case 'email':
    return EMAIL_REGEX.test(value)

  case 'name':
    return NAME_REGEX.test(value)

  case 'fullname':
    return FULL_NAME_REGEX.test(value)

  default:
    return typeof value === 'string'
  }
}

function validateNumber(value: any, format: string | null) {
  if (Array.isArray(value)) return false
  switch(format) {
  case 'int':
  case 'bigint':
    return /^\d{1,}$/.test(value)

  case 'float':
    return /^\d{1,}\.\d{1,}$/.test(value)

  default:
    return typeof value === 'number'
  }
}

function validateDate(value: any, format: AcceptedDateFormats) {
  if (Array.isArray(value)) return false
  const formatConfig = DATE_FORMATS[format]
  if (!formatConfig) throw `Unrecognized datetime format ${format}`
  return formatConfig.regex.test(value)
}

function validateDatetime(value: any, format: AcceptedDatetimeFormats) {
  if (Array.isArray(value)) return false
  const formatConfig = DATETIME_FORMATS[format]
  if (!formatConfig) throw `Unrecognized datetime format ${format}`
  return formatConfig.regex.test(value)
}

function validateValue(value: any, format: string, options: ApiContractOptions={}) {
  const [datatype, _decorators, isArray] = parseDatatype(format)
  let decorators = _decorators as string[]
  if (!isArray && Array.isArray(value)) return false
  if (isArray && !Array.isArray(value)) return false

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
    if (isArray) return !value.map((val: string) => typeof val === 'boolean').includes(false)
    return typeof value === 'boolean'

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
