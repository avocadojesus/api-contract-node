import generateResponse from '../../../src/server/helpers/generateResponse'

describe ('generateResponse: count', () => {
  it ('defaults to 6', () => {
    let res = generateResponse('', { words: 'string[]' })
    expect(res.words.length).toEqual(6)
  })

  context ('an override is specified in decorators', () => {
    it ('accepts the override', () => {
      let res = generateResponse('', { words: 'string:count{20}[]' })
      expect(res.words.length).toEqual(20)
    })

    it ('caps the override at 100', () => {
      let res = generateResponse('', { words: 'string:count{101}[]' })
      expect(res.words.length).toEqual(100)
    })
  })
})
