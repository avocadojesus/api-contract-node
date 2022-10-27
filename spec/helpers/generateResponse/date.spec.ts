import generateResponse from '../../../src/server/helpers/generateResponse'
import { DATETIME_FORMATS, ISO861_DATETIME_REGEX } from '../../../src/config/formats/datetime'
import { DATE_FORMATS } from '../../../src/config/formats/date'

describe ('generateResponse', () => {
  it ('can parse a date response', () => {
    const res = generateResponse('GET:/', { created_at: 'date' })
    expect(res.created_at).toMatch(DATE_FORMATS.yyyymmdd.regex)
  })

  it ('can parse a date[] response', () => {
    const res = generateResponse('GET:/', { dates: 'date[]' })
    expect(res.dates.length).toEqual(2)
    expect(res.dates[0]).toMatch(DATE_FORMATS.yyyymmdd.regex)
    expect(res.dates[1]).toMatch(DATE_FORMATS.yyyymmdd.regex)
  })

  context ('date decorators', () => {
    it ('can parse a date:optional response', () => {
      const res = generateResponse('GET:/', { date: 'date:optional' })
      expect(res.date).toMatch(DATE_FORMATS.yyyymmdd.regex)
    })

    it ('can parse a date:yyyymmdd response', () => {
      const res = generateResponse('GET:/', { date: 'date:yyyymmdd' })
      expect(res.date).toMatch(DATE_FORMATS.yyyymmdd.regex)
    })

    it ('can parse a date:yymmdd response', () => {
      const res = generateResponse('GET:/', { date: 'date:yymmdd' })
      expect(res.date).toMatch(DATE_FORMATS.yymmdd.regex)
    })

    it ('can parse a date:mmddyyyy response', () => {
      const res = generateResponse('GET:/', { date: 'date:mmddyyyy' })
      expect(res.date).toMatch(DATE_FORMATS.mmddyyyy.regex)
    })

    it ('can parse a date:mmddyy response', () => {
      const res = generateResponse('GET:/', { date: 'date:mmddyy' })
      expect(res.date).toMatch(DATE_FORMATS.mmddyy.regex)
    })
  })
})
