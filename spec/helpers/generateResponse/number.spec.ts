import generateResponse from '../../../src/server/helpers/generateResponse'
import { DATETIME_FORMATS, ISO861_DATETIME_REGEX } from '../../../src/config/formats/datetime'
import { DATE_FORMATS } from '../../../src/config/formats/date'

describe ('generateResponse', () => {
  it ('can parse a number response', () => {
    const res = generateResponse('GET:/', { id: 'number' })
    expect(typeof res.id).toEqual('number')
  })

  it ('can parse a number[] response', () => {
    const res = generateResponse('GET:/', { id: 'number[]' })
    expect(res.id.length).toEqual(6)
    expect(typeof res.id[0]).toEqual('number')
    expect(typeof res.id[1]).toEqual('number')
  })

  context ('number decorators', () => {
    it ('can parse number:optional response', () => {
      const res = generateResponse('GET:/', { cost: 'number:optional' })
      expect(res.cost.toString()).toMatch(/^\d{1,}$/)
    })

    it ('can parse number:int response', () => {
      const res = generateResponse('GET:/', { cost: 'number:int' })
      expect(res.cost.toString()).toMatch(/^\d{1,}$/)
    })

    it ('can parse number:bigint response', () => {
      const res = generateResponse('GET:/', { cost: 'number:bigint' })
      expect(res.cost.toString()).toMatch(/^\d{1,}$/)
    })

    it ('can parse number:float response', () => {
      const res = generateResponse('GET:/', { cost: 'number:float' })
      expect(res.cost.toString()).toMatch(/^\d{1,}\.\d{1,}$/)
    })
  })
})
