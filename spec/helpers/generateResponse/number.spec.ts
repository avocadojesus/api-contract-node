import generateResponse from '../../server/helpers/generateResponse'
import { DATETIME_FORMATS, ISO861_DATETIME_REGEX } from '../../../src/config/datetime-formats'
import { DATE_FORMATS } from '../../../src/config/date-formats'

describe ('generateResponse', () => {
  it ('can parse a number response', () => {
    const res = generateResponse({ id: 'number' })
    expect(typeof res.id).toEqual('number')
  })

  it ('can parse a number[] response', () => {
    const res = generateResponse({ id: 'number[]' })
    expect(res.id.length).toEqual(2)
    expect(typeof res.id[0]).toEqual('number')
    expect(typeof res.id[1]).toEqual('number')
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
})
