import generateResponse from '../../../src/server/helpers/generateResponse'
import { DATETIME_FORMATS, ISO861_DATETIME_REGEX } from '../../../src/config/formats/datetime'
import { DATE_FORMATS } from '../../../src/config/formats/date'

describe ('generateResponse', () => {
  it ('can parse a string response', () => {
    const res = generateResponse('GET:/', { name: 'string' })
    expect(typeof res.name).toEqual('string')
  })

  it ('can parse a string[] response', () => {
    const res = generateResponse('GET:/', { name: 'string[]' })
    expect(res.name.length).toEqual(6)
    expect(typeof res.name[0]).toEqual('string')
    expect(typeof res.name[1]).toEqual('string')
  })

  context ('string decorators', () => {
    it ('can parse string:optional response', () => {
      const res = generateResponse('GET:/', { something: 'string:optional' })
      expect(res.something).toMatch(/^[A-Za-z]*$/)
    })

    it ('can parse string:uuid response', () => {
      const res = generateResponse('GET:/', { email: 'string:uuid' })
      expect(res.email).toMatch(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/)
    })

    it ('can parse string:email response', () => {
      const res = generateResponse('GET:/', { email: 'string:email' })
      expect(res.email).toMatch(/.*@.*\..*/)
    })

    it ('can parse string:name response', () => {
      const res = generateResponse('GET:/', { name: 'string:name' })
      expect(res.name).toMatch(/^[A-Za-z]*$/)
    })

    it ('can parse string:fullname response', () => {
      const res = generateResponse('GET:/', { name: 'string:fullname' })
      expect(res.name).toMatch(/^[A-Za-z'.]* [A-Za-z'.]*\s?[A-Za-z'.]{0,}\s?[A-Za-z'.]{0,}$/)
    })

    it ('can parse string:enum{thing otherthing} response', () => {
      const res = generateResponse('GET:/', { type: 'string:enum{cool lame}' })
      expect(['cool', 'lame']).toContain(res.type)
    })
  })
})
