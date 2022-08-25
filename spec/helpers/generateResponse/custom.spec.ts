import generateResponse from '../../server/helpers/generateResponse'
import { DATETIME_FORMATS, ISO861_DATETIME_REGEX } from '../../../src/config/datetime-formats'
import { DATE_FORMATS } from '../../../src/config/date-formats'

describe ('generateResponse', () => {
  context ('when passing custom serializers', () => {
    it ('can parse all datatypes within custom time', () => {
      const res = generateResponse({ user: 'User', users: 'User[]' }, {
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
