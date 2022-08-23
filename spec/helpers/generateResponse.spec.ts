import generateResponse, {
  UNIX_REGEX,
  ANSIC_REGEX,
  KITCHEN_REGEX,
  RFC1123_REGEX,
  RFC1123Z_REGEX,
  RFC3339_REGEX,
  RFC3339_NANO_REGEX,
  RFC822_REGEX,
  RFC822Z_REGEX,
  RFC850_REGEX,
  RUBY_DATE_REGEX,
  STAMP_REGEX,
  STAMP_MICRO_REGEX,
  STAMP_MILLI_REGEX,
  STAMP_NANO_REGEX,
} from '../../src/helpers/generateResponse'
const ISO861_DATE_REGEX = /\d{4}-\d{2}-\d{2}/
const YYMMDD_REGEX = /\d{2}-\d{2}-\d{2}/
const MMDDYY_REGEX = /\d{2}-\d{2}-\d{2}/
const MMDDYYYY_REGEX = /\d{2}-\d{2}-\d{4}/
const ISO861_DATETIME_REGEX = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d*Z/

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
      expect(res.created_at).toMatch(ISO861_DATE_REGEX)
    })

    it ('can parse a datetime response', () => {
      const res = generateResponse({ created_at: 'datetime' })
      expect(res.created_at).toMatch(ISO861_DATETIME_REGEX)
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
      expect(res.dates[0]).toMatch(ISO861_DATE_REGEX)
      expect(res.dates[1]).toMatch(ISO861_DATE_REGEX)
    })

    it ('can parse a datetime[] response', () => {
      const res = generateResponse({ dates: 'datetime[]' })
      expect(res.dates.length).toEqual(2)
      expect(res.dates[0]).toMatch(ISO861_DATETIME_REGEX)
      expect(res.dates[1]).toMatch(ISO861_DATETIME_REGEX)
    })
  })

  context ('date decorators', () => {
    it ('can parse a date:yyyymmdd response', () => {
      const res = generateResponse({ date: 'date:yyyymmdd' })
      expect(res.date).toMatch(ISO861_DATE_REGEX)
    })

    it ('can parse a date:yymmdd response', () => {
      const res = generateResponse({ date: 'date:yymmdd' })
      expect(res.date).toMatch(YYMMDD_REGEX)
    })

    it ('can parse a date:mmddyyyy response', () => {
      const res = generateResponse({ date: 'date:mmddyyyy' })
      expect(res.date).toMatch(MMDDYYYY_REGEX)
    })

    it ('can parse a date:mmddyy response', () => {
      const res = generateResponse({ date: 'date:mmddyy' })
      expect(res.date).toMatch(MMDDYY_REGEX)
    })
  })

  context ('datetime decorators', () => {
    it ('can parse a datetime:ansic response', () => {
      const res = generateResponse({ datetime: 'datetime:ansic' })
      expect(res.datetime).toMatch(ANSIC_REGEX)
    })

    it ('can parse a datetime:kitchen response', () => {
      const res = generateResponse({ datetime: 'datetime:kitchen' })
      expect(res.datetime).toMatch(KITCHEN_REGEX)
    })

    it ('can parse a datetime:rfc1123 response', () => {
      const res = generateResponse({ datetime: 'datetime:rfc1123' })
      expect(res.datetime).toMatch(RFC1123_REGEX)
    })

    it ('can parse a datetime:rfc1123z response', () => {
      const res = generateResponse({ datetime: 'datetime:rfc1123z' })
      expect(res.datetime).toMatch(RFC1123Z_REGEX)
    })

    it ('can parse a datetime:rfc1123z response', () => {
      const res = generateResponse({ datetime: 'datetime:rfc1123z' })
      expect(res.datetime).toMatch(RFC1123Z_REGEX)
    })

    it ('can parse a datetime:rfc3339 response', () => {
      const res = generateResponse({ datetime: 'datetime:rfc3339' })
      expect(res.datetime).toMatch(RFC3339_REGEX)
    })

    it ('can parse a datetime:rfc3339_nano response', () => {
      const res = generateResponse({ datetime: 'datetime:rfc3339_nano' })
      expect(res.datetime).toMatch(RFC3339_NANO_REGEX)
    })

    it ('can parse a datetime:rfc822 response', () => {
      const res = generateResponse({ datetime: 'datetime:rfc822' })
      expect(res.datetime).toMatch(RFC822_REGEX)
    })

    it ('can parse a datetime:rfc822z response', () => {
      const res = generateResponse({ datetime: 'datetime:rfc822z' })
      expect(res.datetime).toMatch(RFC822Z_REGEX)
    })

    it ('can parse a datetime:rfc850 response', () => {
      const res = generateResponse({ datetime: 'datetime:rfc850' })
      expect(res.datetime).toMatch(RFC850_REGEX)
    })

    it ('can parse a datetime:ruby_date response', () => {
      const res = generateResponse({ datetime: 'datetime:ruby_date' })
      expect(res.datetime).toMatch(RUBY_DATE_REGEX)
    })

    it ('can parse a datetime:stamp response', () => {
      const res = generateResponse({ datetime: 'datetime:stamp' })
      expect(res.datetime).toMatch(STAMP_REGEX)
    })

    it ('can parse a datetime:stamp_micro response', () => {
      const res = generateResponse({ datetime: 'datetime:stamp_micro' })
      expect(res.datetime).toMatch(STAMP_MICRO_REGEX)
    })

    it ('can parse a datetime:stamp_milli response', () => {
      const res = generateResponse({ datetime: 'datetime:stamp_milli' })
      expect(res.datetime).toMatch(STAMP_MILLI_REGEX)
    })

    it ('can parse a datetime:stamp_nano response', () => {
      const res = generateResponse({ datetime: 'datetime:stamp_nano' })
      expect(res.datetime).toMatch(STAMP_NANO_REGEX)
    })

    it ('can parse a datetime:stamp_nano response', () => {
      const res = generateResponse({ datetime: 'datetime:stamp_nano' })
      expect(res.datetime).toMatch(STAMP_NANO_REGEX)
    })

    it ('can parse a datetime:unix response', () => {
      const res = generateResponse({ datetime: 'datetime:unix' })
      expect(res.datetime).toMatch(UNIX_REGEX)
    })

    it ('can parse a datetime:unix_date response', () => {
      const res = generateResponse({ datetime: 'datetime:unix_date' })
      expect(res.datetime).toMatch(UNIX_REGEX)
    })
  })
})
