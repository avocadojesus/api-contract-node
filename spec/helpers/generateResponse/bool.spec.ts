import generateResponse from '../../../src/server/helpers/generateResponse'
import { DATETIME_FORMATS, ISO861_DATETIME_REGEX } from '../../../src/config/formats/datetime'
import { DATE_FORMATS } from '../../../src/config/formats/date'

describe ('generateResponse', () => {
  it ('can parse a bool response', () => {
    const res = generateResponse('GET:/', { likes_cats: 'bool' })
    expect(typeof res.likes_cats).toEqual('boolean')
  })

  it ('can parse a bool[] response', () => {
    const res = generateResponse('GET:/', { preferences: 'bool[]' })
    expect(res.preferences.length).toEqual(6)
    expect(typeof res.preferences[0]).toEqual('boolean')
    expect(typeof res.preferences[1]).toEqual('boolean')
  })

  context ('decorators', () => {
    it ('can parse an optional decorator', () => {
      const res = generateResponse('GET:/', { likes_cats: 'bool:optional' })
      expect(typeof res.likes_cats).toEqual('boolean')
    })
  })
})
