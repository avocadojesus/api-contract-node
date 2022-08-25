import generateResponse from '../../server/helpers/generateResponse'
import { DATETIME_FORMATS, ISO861_DATETIME_REGEX } from '../../../src/config/datetime-formats'
import { DATE_FORMATS } from '../../../src/config/date-formats'

describe ('generateResponse', () => {
  it ('can parse a bool response', () => {
    const res = generateResponse({ likes_cats: 'bool' })
    expect(typeof res.likes_cats).toEqual('boolean')
  })

  it ('can parse a bool[] response', () => {
    const res = generateResponse({ preferences: 'bool[]' })
    expect(res.preferences.length).toEqual(2)
    expect(typeof res.preferences[0]).toEqual('boolean')
    expect(typeof res.preferences[1]).toEqual('boolean')
  })
})
