import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'
import getDateFormatFromDecorators from './getDateFormatFromDecorators'
import getDatetimeFormatFromDecorators from './getDatetimeFormatFromDecorators'
import mmddyyyy from './mmddyyyy'
import mmddyy from './mmddyy'
import parseDatatype from './parseDatatype'
import { DATETIME_FORMATS, AcceptedDatetimeFormats } from '../config/formats'

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
        if (!dateFormat) throw `Unrecognized date format: ${dateFormat}`

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

function datetimeString(format: AcceptedDatetimeFormats) {
  const date = DateTime.now()
  const formatConfig = DATETIME_FORMATS[format]
  if (!formatConfig) throw `Unrecognized datetime format ${format}`

  return date.toFormat(formatConfig.luxon)
}
