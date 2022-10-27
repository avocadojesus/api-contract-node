import generateResponse from '../../../src/server/helpers/generateResponse'
import { DATETIME_FORMATS, ISO861_DATETIME_REGEX } from '../../../src/config/formats/datetime'
import { DATE_FORMATS } from '../../../src/config/formats/date'
import { InvalidFormat } from '../../../src/exceptions/invalid-format'

describe ('generateResponse', () => {
  it ('raises exception when given an invalid format', () => {
    expect(() => {
      generateResponse('GET:/', { created_at: 'data' })
    }).toThrowError(new InvalidFormat('created_at', 'data'))
  })
})
