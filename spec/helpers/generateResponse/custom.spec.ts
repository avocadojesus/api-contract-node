import generateResponse from '../../../src/server/helpers/generateResponse'

describe ('generateResponse', () => {
  context ('when passing custom serializers', () => {
    it ('can parse all datatypes within custom time', () => {
      const res = generateResponse('GET:/', { user: 'User:optional', users: 'User:optional[]' }, {
        serializers: {
          User: {
            id: 'string:uuid',
            email: 'string:email',
          }
        }
      })

      expect(typeof res.user.id).toEqual('string')
      expect(typeof res.user.email).toEqual('string')
      expect(typeof res.users[0]?.id).toEqual('string')
      expect(typeof res.users[0]?.email).toEqual('string')
      expect(typeof res.users[1]?.id).toEqual('string')
      expect(typeof res.users[1]?.email).toEqual('string')
    })
  })
})
