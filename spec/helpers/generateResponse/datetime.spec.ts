import generateResponse from '../../../src/server/helpers/generateResponse'
import { DATETIME_FORMATS, ISO861_DATETIME_REGEX } from '../../../src/config/formats/datetime'
import { DATE_FORMATS } from '../../../src/config/formats/date'

describe ('generateResponse', () => {
  it ('can parse a datetime response', () => {
    const res = generateResponse({ created_at: 'datetime' })
    expect(res.created_at).toMatch(DATETIME_FORMATS.iso861.regex)
  })

  it ('can parse a datetime[] response', () => {
    const res = generateResponse({ dates: 'datetime[]' })
    expect(res.dates.length).toEqual(2)
    expect(res.dates[0]).toMatch(ISO861_DATETIME_REGEX)
    expect(res.dates[1]).toMatch(ISO861_DATETIME_REGEX)
  })

  context ('datetime decorators', () => {
    it ('can parse a datetime:ansic response', () => {
      const res = generateResponse({ datetime: 'datetime:ansic' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.ansic.regex)
    })

    it ('can parse a datetime:kitchen response', () => {
      const res = generateResponse({ datetime: 'datetime:kitchen' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.kitchen.regex)
    })

    it ('can parse a datetime:rfc1123 response', () => {
      const res = generateResponse({ datetime: 'datetime:rfc1123' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.rfc1123.regex)
    })

    it ('can parse a datetime:rfc1123z response', () => {
      const res = generateResponse({ datetime: 'datetime:rfc1123z' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.rfc1123z.regex)
    })

    it ('can parse a datetime:rfc3339 response', () => {
      const res = generateResponse({ datetime: 'datetime:rfc3339' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.rfc3339.regex)
    })

    it ('can parse a datetime:rfc3339_nano response', () => {
      const res = generateResponse({ datetime: 'datetime:rfc3339_nano' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.rfc3339_nano.regex)
    })

    it ('can parse a datetime:rfc822 response', () => {
      const res = generateResponse({ datetime: 'datetime:rfc822' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.rfc822.regex)
    })

    it ('can parse a datetime:rfc822z response', () => {
      const res = generateResponse({ datetime: 'datetime:rfc822z' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.rfc822z.regex)
    })

    it ('can parse a datetime:rfc850 response', () => {
      const res = generateResponse({ datetime: 'datetime:rfc850' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.rfc850.regex)
    })

    it ('can parse a datetime:ruby_date response', () => {
      const res = generateResponse({ datetime: 'datetime:ruby_date' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.ruby_date.regex)
    })

    it ('can parse a datetime:stamp response', () => {
      const res = generateResponse({ datetime: 'datetime:stamp' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.stamp.regex)
    })

    it ('can parse a datetime:stamp_micro response', () => {
      const res = generateResponse({ datetime: 'datetime:stamp_micro' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.stamp_micro.regex)
    })

    it ('can parse a datetime:stamp_milli response', () => {
      const res = generateResponse({ datetime: 'datetime:stamp_milli' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.stamp_milli.regex)
    })

    it ('can parse a datetime:stamp_nano response', () => {
      const res = generateResponse({ datetime: 'datetime:stamp_nano' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.stamp_nano.regex)
    })

    it ('can parse a datetime:unix response', () => {
      const res = generateResponse({ datetime: 'datetime:unix' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.unix.regex)
    })

    it ('can parse a datetime:unix_date response', () => {
      const res = generateResponse({ datetime: 'datetime:unix_date' })
      expect(res.datetime).toMatch(DATETIME_FORMATS.unix.regex)
    })
  })

  context ('nesting', () => {
    it ('can parse a single-nested response payload', () => {
      const res = generateResponse({
        results: {
          email: 'string',
        }
      })
      expect(typeof res.results.email).toEqual('string')
    })

    it ('can parse a double-nested response payload', () => {
      const res = generateResponse({
        results: {
          user: {
            email: 'string',
          }
        }
      })
      expect(typeof res.results.user.email).toEqual('string')
    })

    it ('can parse a triple-nested response payload', () => {
      const res = generateResponse({
        data: {
          results: {
            user: {
              email: 'string',
            }
          }
        }
      })
      expect(typeof res.data.results.user.email).toEqual('string')
    })
  })
})
