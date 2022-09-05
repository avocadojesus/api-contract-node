import generateResponse from '../../../src/server/helpers/generateResponse'

describe ('generateResponse', () => {
  it ('injects actual param values when they are found in the result payload', () => {
    let res = generateResponse({ id: 'number', email: 'string:email' }, {}, { id: 123 })
    expect(res.id).toEqual(123)

    res = generateResponse({ id: 'number', email: 'string:email' }, {}, { email: 'james@james.james' })
    expect(res.email).toEqual('james@james.james')
  })

  context ('when using serializers/array values', () => {
    it ('injects param values, same as with non-serialized results', () => {
      const res = generateResponse({ users: 'User[]' }, {
        serializers: {
          User: {
            id: 'number',
            name: 'string:name'
          }
        }
      }, { name: 'james' })
      expect(res.users[0].name).toEqual('james')
      expect(res.users[1].name).toEqual('james')
    })
  })

  context ('route params found are not present in payload', () => {
    it ('does not inject the unfound params into the payload', () => {
      const res = generateResponse({
        id: 'number',
        email: 'string:email',
      }, {}, { idz: 123 })
      expect(res.idz).toEqual(undefined)
    })
  })
})
