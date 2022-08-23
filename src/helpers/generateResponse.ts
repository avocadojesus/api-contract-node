import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'
import getDateFormatFromDecorators from './getDateFormatFromDecorators'
import getDatetimeFormatFromDecorators, {
  ANSIC_FORMAT,
  KITCHEN_FORMAT,
  RFC1123_FORMAT,
  RFC1123Z_FORMAT,
  RFC3339_FORMAT,
  RFC3339_NANO_FORMAT,
  RFC822_FORMAT,
  RFC822Z_FORMAT,
  RFC850_FORMAT,
  RUBY_DATE_FORMAT,
  STAMP_FORMAT,
  STAMP_MICRO_FORMAT,
  STAMP_MILLI_FORMAT,
  STAMP_NANO_FORMAT,
  UNIX_FORMAT,
  UNIX_ALTERNATE_FORMAT,
} from './getDatetimeFormatFromDecorators'
import mmddyyyy from './mmddyyyy'
import mmddyy from './mmddyy'
import parseDatatype from './parseDatatype'

export const UNIX_LUXON_FORMAT = 'ccc MMM dd HH:mm:ss ZZZZ y'
export const ANSIC_LUXON_FORMAT = 'ccc MMM dd HH:mm:ss y'
export const KITCHEN_LUXON_FORMAT = 'hh:mma'
export const RFC1123_LUXON_FORMAT = 'ccc, dd MMM y HH:mm:ss ZZZZ'
export const RFC1123Z_LUXON_FORMAT = 'ccc, dd MMM y HH:mm:ss ZZZ'
export const RFC3339_LUXON_FORMAT = "y-MM-dd'T'HH:mm:ssZZ"
export const RFC3339_NANO_LUXON_FORMAT = "y-MM-dd'T'HH:mm:ss.SZZ"
export const RFC822_LUXON_FORMAT = 'dd MMM yy HH:mm ZZZZ'
export const RFC822Z_LUXON_FORMAT = 'dd MMM yy HH:mm ZZZ'
export const RFC850_LUXON_FORMAT = 'cccc, dd-MMM-yy HH:mm:ss ZZZZ'
export const RUBY_DATE_LUXON_FORMAT = 'ccc MMM dd HH:mm:ss ZZZ y'
export const STAMP_LUXON_FORMAT = 'MMM dd HH:mm:ss'
export const STAMP_MICRO_LUXON_FORMAT = 'MMM dd HH:mm:ss.S'
export const STAMP_MILLI_LUXON_FORMAT = 'MMM dd HH:mm:ss.S'
export const STAMP_NANO_LUXON_FORMAT = 'MMM dd HH:mm:ss.S'

export const UNIX_REGEX = /^[a-zA-Z]+ [a-zA-Z]+ \d{2} \d{2}:\d{2}:\d{2} [A-Z]{3} \d{4}$/
export const ANSIC_REGEX = /^[a-zA-Z]+ [a-zA-Z]+ \d{2} \d{2}:\d{2}:\d{2} \d{4}$/
export const KITCHEN_REGEX = /\d{1,2}:\d{2}(AM|PM)/
export const RFC1123_REGEX = /^[a-zA-Z]+, \d{1,2} [a-zA-Z]+ \d{4} \d{2}:\d{2}:\d{2} [A-Z]{3}/
export const RFC1123Z_REGEX = /^[a-zA-Z]+, \d{1,2} [a-zA-Z]+ \d{4} \d{2}:\d{2}:\d{2} (\+|-)\d{4}/
export const RFC3339_REGEX = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\+|-)\d{2}:\d{2}/
export const RFC3339_NANO_REGEX = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{2,6}(\+|-)\d{2}:\d{2}/
export const RFC822_REGEX = /^\d{1,2} [a-zA-Z]+ \d{2} \d{2}:\d{2} [A-Z]{3}/
export const RFC822Z_REGEX = /^\d{1,2} [a-zA-Z]+ \d{2} \d{2}:\d{2} (\+|-)\d{4}/
export const RFC850_REGEX = /^[A-Za-z]+, \d{2}-[A-Za-z]+-\d{2} \d{2}:\d{2}:\d{2} [A-Z]{3}/
export const RUBY_DATE_REGEX = /^[A-Za-z]+ [A-Za-z]+ \d{2} \d{2}:\d{2}:\d{2} (\+|-)\d{4} \d{4}/
export const STAMP_REGEX = /^[A-Za-z]{3} \d{2} \d{2}:\d{2}:\d{2}/
export const STAMP_MICRO_REGEX = /^[A-Za-z]{3} \d{2} \d{2}:\d{2}:\d{2}\.\d+/
export const STAMP_MILLI_REGEX = /^[A-Za-z]{3} \d{2} \d{2}:\d{2}:\d{2}\.\d+/
export const STAMP_NANO_REGEX = /^[A-Za-z]{3} \d{2} \d{2}:\d{2}:\d{2}\.\d+/

export default function generateResponse(payloadShape: {[key: string]: any}) {
  const results: {[key: string]: any} = {}

  Object.keys(payloadShape).forEach(key => {
    const [datatype, _decorators, isArray] = parseDatatype(payloadShape[key])
    let decorators = _decorators as string[]

    switch(datatype) {
    case 'string':
      results[key] = isArray ?
        [
          faker.lorem.word(),
          faker.lorem.word(),
        ] :
        faker.lorem.word()
      break

    case 'number':
      results[key] = isArray ?
        [
          parseInt(faker.datatype.bigInt().toString()),
          parseInt(faker.datatype.bigInt().toString())
        ] :
        parseInt(faker.datatype.bigInt().toString())
      break

    case 'bool':
      results[key] = isArray ?
        [
          faker.datatype.boolean(),
          faker.datatype.boolean()
        ] :
        faker.datatype.boolean()
      break

    case 'date':
      if (decorators.length) {
        const dateFormat = getDateFormatFromDecorators(decorators)
        results[key] = isArray ? [ dateString(dateFormat), dateString(dateFormat) ] : dateString(dateFormat)

      } else {
        results[key] = isArray ?
          [
            dateString('yyyymmdd'),
            dateString('yyyymmdd'),
          ] :
          dateString('yyyymmdd')
      }
      break

    case 'datetime':
      if (decorators.length) {
        const dateFormat = getDatetimeFormatFromDecorators(decorators)
        results[key] = isArray ? [ datetimeString(dateFormat), datetimeString(dateFormat) ] : datetimeString(dateFormat)

      } else {
        results[key] = isArray ?
          [
            new Date().toISOString(),
            new Date().toISOString(),
          ] :
          new Date().toISOString()
      }
      break

    default:
      throw `Unrecognized datatype for field ${key}: ${payloadShape[key]}`
    }
  })
  return results
}

function dateString(format: string) {
  switch(format) {
  case 'yyyymmdd':
    return new Date().toISOString().split('T')[0]

  case 'yymmdd':
    return new Date().toISOString().split('T')[0].replace(/^\d\d/, '')

  case 'mmddyyyy':
    return mmddyyyy(new Date())

  case 'mmddyy':
    return mmddyy(new Date())

  default:
    throw `unrecognized date format: ${format}`
  }
}

function datetimeString(format: string) {
  const date = DateTime.now()
  switch(format) {
  case ANSIC_FORMAT:
    return date.toFormat(ANSIC_LUXON_FORMAT)

  case UNIX_FORMAT:
  case UNIX_ALTERNATE_FORMAT:
    return date.toFormat(UNIX_LUXON_FORMAT)

  case KITCHEN_FORMAT:
    return date.toFormat(KITCHEN_LUXON_FORMAT)

  case RFC1123_FORMAT:
    return date.toFormat(RFC1123_LUXON_FORMAT)

  case RFC1123Z_FORMAT:
    return date.toFormat(RFC1123Z_LUXON_FORMAT)

  case RFC3339_FORMAT:
    return date.toFormat(RFC3339_LUXON_FORMAT)

  case RFC3339_NANO_FORMAT:
    return date.toFormat(RFC3339_NANO_LUXON_FORMAT)

  case RFC822_FORMAT:
    return date.toFormat(RFC822_LUXON_FORMAT)

  case RFC822Z_FORMAT:
    return date.toFormat(RFC822Z_LUXON_FORMAT)

  case RFC850_FORMAT:
    return date.toFormat(RFC850_LUXON_FORMAT)

  case RUBY_DATE_FORMAT:
    return date.toFormat(RUBY_DATE_LUXON_FORMAT)

  case STAMP_FORMAT:
    return date.toFormat(STAMP_LUXON_FORMAT)

  case STAMP_MICRO_FORMAT:
    return date.toFormat(STAMP_MICRO_LUXON_FORMAT)

  case STAMP_MILLI_FORMAT:
    return date.toFormat(STAMP_MILLI_LUXON_FORMAT)

  case STAMP_NANO_FORMAT:
    return date.toFormat(STAMP_NANO_LUXON_FORMAT)

  default:
    throw `unrecognized date format: ${format}`
  }
}
