import generateResponse from '../../../src/helpers/generateResponse'
import { DATETIME_FORMATS, ISO861_DATETIME_REGEX } from '../../../src/config/datetime-formats'
import { DATE_FORMATS } from '../../../src/config/date-formats'

describe ('generateResponse', () => {
  context ('nesting', () => {
    it ('can parse a single-nested response payload', () => {
      const res = generateResponse({
        results: {
          email: 'string',
        }
      })
      expect(typeof res.results.email).toEqual('string')
    })

    it ('can parse a double-nested response payload', () => {
      const res = generateResponse({
        results: {
          user: {
            email: 'string',
          }
        }
      })
      expect(typeof res.results.user.email).toEqual('string')
    })

    it ('can parse a triple-nested response payload', () => {
      const res = generateResponse({
        data: {
          results: {
            user: {
              email: 'string',
            }
          }
        }
      })
      expect(typeof res.data.results.user.email).toEqual('string')
    })
  })
})
