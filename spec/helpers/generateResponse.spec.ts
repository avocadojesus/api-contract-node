import generateResponse from '../../src/helpers/generateResponse'
import { DATETIME_FORMATS, ISO861_DATETIME_REGEX } from '../../src/config/datetime-formats'
import { DATE_FORMATS } from '../../src/config/date-formats'

describe ('generateResponse', () => {
  context ('basic datatypes', () => {
    it ('can parse a string response', () => {
      const res = generateResponse({ name: 'string' })
      expect(typeof res.name).toEqual('string')
    })

    it ('can parse a number response', () => {
      const res = generateResponse({ id: 'number' })
      expect(typeof res.id).toEqual('number')
    })

    it ('can parse a bool response', () => {
      const res = generateResponse({ likes_cats: 'bool' })
      expect(typeof res.likes_cats).toEqual('boolean')
    })

    it ('can parse a date response', () => {
      const res = generateResponse({ created_at: 'date' })
      expect(res.created_at).toMatch(DATE_FORMATS.yyyymmdd.regex)
    })

    it ('can parse a datetime response', () => {
      const res = generateResponse({ created_at: 'datetime' })
      expect(res.created_at).toMatch(DATETIME_FORMATS.iso861.regex)
    })
  })

  context ('array datatypes', () => {
    it ('can parse a string[] response', () => {
      const res = generateResponse({ name: 'string[]' })
      expect(res.name.length).toEqual(2)
      expect(typeof res.name[0]).toEqual('string')
      expect(typeof res.name[1]).toEqual('string')
    })

    it ('can parse a number[] response', () => {
      const res = generateResponse({ id: 'number[]' })
      expect(res.id.length).toEqual(2)
      expect(typeof res.id[0]).toEqual('number')
      expect(typeof res.id[1]).toEqual('number')
    })

    it ('can parse a bool[] response', () => {
      const res = generateResponse({ preferences: 'bool[]' })
      expect(res.preferences.length).toEqual(2)
      expect(typeof res.preferences[0]).toEqual('boolean')
      expect(typeof res.preferences[1]).toEqual('boolean')
    })

    it ('can parse a date[] response', () => {
      const res = generateResponse({ dates: 'date[]' })
      expect(res.dates.length).toEqual(2)
      expect(res.dates[0]).toMatch(DATE_FORMATS.yyyymmdd.regex)
      expect(res.dates[1]).toMatch(DATE_FORMATS.yyyymmdd.regex)
    })

    it ('can parse a datetime[] response', () => {
      const res = generateResponse({ dates: 'datetime[]' })
      expect(res.dates.length).toEqual(2)
      expect(res.dates[0]).toMatch(ISO861_DATETIME_REGEX)
      expect(res.dates[1]).toMatch(ISO861_DATETIME_REGEX)
    })
  })

  context ('number decorators', () => {
    it ('can parse number:int response', () => {
      const res = generateResponse({ cost: 'number:int' })
      expect(res.cost.toString()).toMatch(/^\d{1,}$/)
    })

    it ('can parse number:bigint response', () => {
      const res = generateResponse({ cost: 'number:bigint' })
      expect(res.cost.toString()).toMatch(/^\d{1,}$/)
    })

    it ('can parse number:float response', () => {
      const res = generateResponse({ cost: 'number:float' })
      expect(res.cost.toString()).toMatch(/^\d{1,}\.\d{1,}$/)
    })
  })

  context ('string decorators', () => {
    it ('can parse string:email response', () => {
      const res = generateResponse({ email: 'string:email' })
      expect(res.email).toMatch(/.*@.*\..*/)
    })

    it ('can parse string:name response', () => {
      const res = generateResponse({ name: 'string:name' })
      expect(res.name).toMatch(/^[A-Za-z]*$/)
    })

    it ('can parse string:fullname response', () => {
      const res = generateResponse({ name: 'string:fullname' })
      expect(res.name).toMatch(/^[A-Za-z]* [A-Za-z]*\s?[A-Za-z]{0,}$/)
    })
  })

  context ('date decorators', () => {
    it ('can parse a date:yyyymmdd response', () => {
      const res = generateResponse({ date: 'date:yyyymmdd' })
      expect(res.date).toMatch(DATE_FORMATS.yyyymmdd.regex)
    })

    it ('can parse a date:yymmdd response', () => {
      const res = generateResponse({ date: 'date:yymmdd' })
      expect(res.date).toMatch(DATE_FORMATS.yymmdd.regex)
    })

    it ('can parse a date:mmddyyyy response', () => {
      const res = generateResponse({ date: 'date:mmddyyyy' })
      expect(res.date).toMatch(DATE_FORMATS.mmddyyyy.regex)
    })

    it ('can parse a date:mmddyy response', () => {
      const res = generateResponse({ date: 'date:mmddyy' })
      expect(res.date).toMatch(DATE_FORMATS.mmddyy.regex)
    })
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
